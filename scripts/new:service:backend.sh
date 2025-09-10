#!/usr/bin/env bash

# Script to create a new backend microservice
# Usage: ./scripts/new:service:backend.sh <service-name> <language>

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check arguments
if [ $# -lt 1 ]; then
    print_error "Usage: $0 <service-name> [language]"
    print_error "Languages: node (default), python"
    exit 1
fi

SERVICE_NAME=$1
LANG=${2:-node}
SERVICE_DIR="services/${SERVICE_NAME}"
COMPOSE_FILE="docker-compose.yml"
KONG_CONFIG="gateway/kong/kong.yml"

# Validate service name
if [[ ! "$SERVICE_NAME" =~ ^[a-z][a-z0-9-]*[a-z0-9]$ ]]; then
    print_error "Service name must be lowercase, start with a letter, and contain only letters, numbers, and hyphens"
    exit 1
fi

# Check if service already exists
if [ -d "$SERVICE_DIR" ]; then
    print_error "Service '$SERVICE_NAME' already exists in $SERVICE_DIR"
    exit 1
fi

print_status "Creating new backend service: $SERVICE_NAME (language: $LANG)"

# Create service directory
mkdir -p "$SERVICE_DIR"

# Copy template based on language
case "$LANG" in
    node|nodejs)
        print_status "Using Node.js template"
        cp -r services/backend-node-template/* "$SERVICE_DIR/"
        ;;
    python|py)
        print_status "Using Python template"
        cp -r services/backend-python-template/* "$SERVICE_DIR/"
        ;;
    *)
        print_error "Unsupported language: $LANG"
        print_error "Supported languages: node, python"
        exit 1
        ;;
esac

# Replace placeholders in files
print_status "Replacing placeholders in service files..."

find "$SERVICE_DIR" -type f \( -name "*.js" -o -name "*.ts" -o -name "*.json" -o -name "*.md" -o -name "*.py" -o -name "*.toml" \) -exec sed -i.bak "s/backend-node-template/${SERVICE_NAME}/g" {} \;
find "$SERVICE_DIR" -type f \( -name "*.js" -o -name "*.ts" -o -name "*.json" -o -name "*.md" -o -name "*.py" -o -name "*.toml" \) -exec sed -i.bak "s/backend-python-template/${SERVICE_NAME}/g" {} \;

# Clean up backup files
find "$SERVICE_DIR" -name "*.bak" -delete

# Generate random port for the service
SERVICE_PORT=$((7000 + RANDOM % 1000))
METRICS_PORT=$((9464 + RANDOM % 100))

print_status "Generated ports: Service=$SERVICE_PORT, Metrics=$METRICS_PORT"

# Add service to docker-compose.yml
print_status "Adding service to docker-compose.yml..."

cat >> "$COMPOSE_FILE" << EOF

  # ${SERVICE_NAME} service
  ${SERVICE_NAME}:
    build:
      context: ./services/${SERVICE_NAME}
      dockerfile: Dockerfile
    container_name: ${SERVICE_NAME}
    environment:
      SERVICE_NAME: ${SERVICE_NAME}
      SERVICE_VERSION: 0.1.0
      PORT: 7000
      PROMETHEUS_PORT: 9464
      LOG_LEVEL: info
      NODE_ENV: development
      OIDC_JWKS_URL: http://keycloak:8080/realms/platform/protocol/openid-connect/certs
      OIDC_AUDIENCE: api:${SERVICE_NAME}
      OTEL_EXPORTER_OTLP_ENDPOINT: http://tempo:4318
    ports:
      - "${SERVICE_PORT}:7000"
      - "${METRICS_PORT}:9464"
    depends_on:
      - keycloak
      - redis
      - tempo
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:7000/healthz"]
      interval: 30s
      timeout: 10s
      retries: 5
    networks:
      - platform
EOF

# Add service to Kong configuration
print_status "Adding service route to Kong configuration..."

cat >> "$KONG_CONFIG" << EOF

# ${SERVICE_NAME} service
- name: ${SERVICE_NAME}
  url: http://${SERVICE_NAME}:7000
  routes:
  - name: ${SERVICE_NAME}-route
    paths: ["/api/${SERVICE_NAME}"]
    strip_path: true
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
  plugins:
  - name: oidc
    config:
      issuer: http://keycloak:8080/realms/platform
      discovery: true
      bearer_only: true
      client_id: gateway-kong
      client_secret: changeme
      realm: platform
      introspection_endpoint_auth_method: client_secret_post
      filters: "~^/(healthz|metrics)$"
      ssl_verify: false
      timeout: 10000
      keepalive: 60000
      cache_ttl: 300
  - name: rate-limiting
    config:
      minute: 100
      hour: 1000
      policy: local
  - name: request-size-limiting
    config:
      allowed_payload_size: 10
EOF

# Update Prometheus configuration
print_status "Adding service to Prometheus configuration..."

PROMETHEUS_CONFIG="ops/observability/prometheus.yml"
if grep -q "microservices:" "$PROMETHEUS_CONFIG"; then
    # Add to existing microservices job
    sed -i.bak "/microservices:/,/scrape_interval:/{s/targets: \[/targets: \n        - '${SERVICE_NAME}:9464'/}" "$PROMETHEUS_CONFIG"
    rm -f "$PROMETHEUS_CONFIG.bak"
else
    print_warning "Could not find microservices job in Prometheus config"
fi

print_success "Service '$SERVICE_NAME' created successfully!"
print_success "Service directory: $SERVICE_DIR"
print_success "Service port: $SERVICE_PORT"
print_success "Metrics port: $METRICS_PORT"
print_success "API endpoint: http://localhost:8000/api/${SERVICE_NAME}"

print_warning "Next steps:"
echo "1. Update Keycloak realm to add client for '${SERVICE_NAME}'"
echo "2. Run: docker compose -f ${COMPOSE_FILE} up -d ${SERVICE_NAME}"
echo "3. Test the service: curl http://localhost:${SERVICE_PORT}/healthz"
echo "4. Test the API: curl -H 'Authorization: Bearer <token>' http://localhost:8000/api/${SERVICE_NAME}/v1/hello"

print_status "Service creation completed!"
