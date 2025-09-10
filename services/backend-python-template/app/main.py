import os
import json
import logging
from typing import Optional, Dict, Any
from fastapi import FastAPI, Request, HTTPException, Depends, Response
from fastapi.responses import JSONResponse
from jose import jwt, jwk
from jose.utils import base64url_decode
import httpx
from prometheus_client import Counter, Histogram, generate_latest, CONTENT_TYPE_LATEST
from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk.resources import Resource
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from opentelemetry.instrumentation.httpx import HTTPXClientInstrumentor
from opentelemetry.instrumentation.requests import RequestsInstrumentor

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Environment variables
SERVICE_NAME = os.getenv('SERVICE_NAME', 'backend-python-template')
SERVICE_VERSION = os.getenv('SERVICE_VERSION', '0.1.0')
OIDC_JWKS_URL = os.getenv('OIDC_JWKS_URL', 'http://keycloak:8080/realms/platform/protocol/openid-connect/certs')
EXPECTED_AUD = os.getenv('OIDC_AUDIENCE', 'api:backend-python-template')
OTEL_ENDPOINT = os.getenv('OTEL_EXPORTER_OTLP_ENDPOINT', 'http://tempo:4318')

# Prometheus metrics
REQUESTS_TOTAL = Counter('http_requests_total', 'Total HTTP requests', ['method', 'endpoint', 'status'])
REQUEST_DURATION = Histogram('http_request_duration_seconds', 'HTTP request duration', ['method', 'endpoint'])

# JWT verification
class JWTAuth:
    def __init__(self):
        self.jwks = None
        self.jwks_url = OIDC_JWKS_URL
        self.expected_aud = EXPECTED_AUD
        self._load_jwks()

    def _load_jwks(self):
        """Load JWKS from Keycloak"""
        try:
            with httpx.Client(timeout=10.0) as client:
                response = client.get(self.jwks_url)
                response.raise_for_status()
                self.jwks = response.json()
                logger.info(f"Loaded JWKS from {self.jwks_url}")
        except Exception as e:
            logger.error(f"Failed to load JWKS: {e}")
            self.jwks = None

    def verify_token(self, token: str) -> Dict[str, Any]:
        """Verify JWT token"""
        if not self.jwks:
            raise HTTPException(status_code=500, detail="JWKS not available")

        try:
            # Decode header to get key ID
            header = jwt.get_unverified_header(token)
            kid = header.get('kid')
            
            # Find the key
            key = None
            for jwk_key in self.jwks['keys']:
                if jwk_key['kid'] == kid:
                    key = jwk_key
                    break
            
            if not key:
                raise HTTPException(status_code=401, detail="Invalid key ID")

            # Verify and decode token
            claims = jwt.decode(
                token, 
                key, 
                algorithms=[key['alg']], 
                audience=self.expected_aud,
                options={"verify_exp": True}
            )
            
            return claims
            
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token expired")
        except jwt.JWTError as e:
            raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")
        except Exception as e:
            logger.error(f"Token verification error: {e}")
            raise HTTPException(status_code=401, detail="Token verification failed")

# Global auth instance
auth = JWTAuth()

# Dependency for JWT authentication
async def require_auth(request: Request) -> Dict[str, Any]:
    """Require valid JWT authentication"""
    auth_header = request.headers.get('authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        raise HTTPException(status_code=401, detail="Missing or invalid authorization header")
    
    token = auth_header[7:]  # Remove 'Bearer ' prefix
    return auth.verify_token(token)

# Dependency for admin role
async def require_admin_role(user: Dict[str, Any] = Depends(require_auth)) -> Dict[str, Any]:
    """Require admin role"""
    roles = user.get('realm_access', {}).get('roles', [])
    if 'admin' not in roles:
        raise HTTPException(status_code=403, detail="Admin role required")
    return user

# Setup OpenTelemetry
def setup_tracing():
    """Setup OpenTelemetry tracing"""
    resource = Resource.create({
        "service.name": SERVICE_NAME,
        "service.version": SERVICE_VERSION,
        "deployment.environment": os.getenv("ENVIRONMENT", "development")
    })
    
    provider = TracerProvider(resource=resource)
    trace.set_tracer_provider(provider)
    
    exporter = OTLPSpanExporter(endpoint=f"{OTEL_ENDPOINT}/v1/traces")
    span_processor = BatchSpanProcessor(exporter)
    provider.add_span_processor(span_processor)
    
    # Instrument libraries
    FastAPIInstrumentor.instrument_app(app)
    HTTPXClientInstrumentor().instrument()
    RequestsInstrumentor().instrument()
    
    logger.info(f"OpenTelemetry tracing enabled for {SERVICE_NAME}")

# Create FastAPI app
app = FastAPI(
    title=SERVICE_NAME,
    version=SERVICE_VERSION,
    description="Python microservice template with JWT auth and OpenTelemetry"
)

# Setup tracing
setup_tracing()

# Middleware for metrics
@app.middleware("http")
async def metrics_middleware(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time
    
    REQUESTS_TOTAL.labels(
        method=request.method,
        endpoint=request.url.path,
        status=response.status_code
    ).inc()
    
    REQUEST_DURATION.labels(
        method=request.method,
        endpoint=request.url.path
    ).observe(duration)
    
    return response

# Health check endpoints
@app.get("/healthz")
async def health_check():
    return {
        "status": "ok",
        "service": SERVICE_NAME,
        "version": SERVICE_VERSION,
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/readyz")
async def readiness_check():
    # Add readiness checks here (DB, Redis, etc.)
    return {
        "ready": True,
        "service": SERVICE_NAME,
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/metrics")
async def metrics():
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)

# Public routes
@app.get("/v1/info")
async def service_info():
    return {
        "service": SERVICE_NAME,
        "version": SERVICE_VERSION,
        "environment": os.getenv("ENVIRONMENT", "development"),
        "timestamp": datetime.utcnow().isoformat()
    }

# Protected routes
@app.get("/v1/hello")
async def hello(user: Dict[str, Any] = Depends(require_auth)):
    username = user.get('preferred_username', 'anonymous')
    return {
        "message": f"Hello {username} from {SERVICE_NAME}!",
        "user": {
            "sub": user.get('sub'),
            "preferred_username": user.get('preferred_username'),
            "email": user.get('email'),
            "roles": user.get('realm_access', {}).get('roles', [])
        },
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/v1/admin")
async def admin_endpoint(user: Dict[str, Any] = Depends(require_admin_role)):
    return {
        "message": f"Admin access granted for {user.get('preferred_username')}",
        "service": SERVICE_NAME,
        "timestamp": datetime.utcnow().isoformat()
    }

# Error handlers
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail, "status_code": exc.status_code}
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={"error": "Internal server error"}
    )

if __name__ == "__main__":
    import uvicorn
    import time
    from datetime import datetime
    
    port = int(os.getenv("PORT", 7000))
    metrics_port = int(os.getenv("PROMETHEUS_PORT", 9464))
    
    logger.info(f"🚀 Starting {SERVICE_NAME} on port {port}")
    logger.info(f"📊 Metrics available on port {metrics_port}")
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        log_level="info",
        access_log=True
    )
