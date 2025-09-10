# Backend Python Template

Template de microservice Python avec authentification JWT, métriques Prometheus et tracing OpenTelemetry.

## Variables d'environnement

- `SERVICE_NAME`: Nom du service (défaut: backend-python-template)
- `SERVICE_VERSION`: Version du service (défaut: 0.1.0)
- `PORT`: Port d'écoute HTTP (défaut: 7000)
- `PROMETHEUS_PORT`: Port des métriques Prometheus (défaut: 9464)
- `LOG_LEVEL`: Niveau de log (défaut: info)
- `ENVIRONMENT`: Environnement (development/production)
- `OIDC_JWKS_URL`: URL des clés publiques Keycloak
- `OIDC_AUDIENCE`: Audience attendue dans les tokens JWT
- `OTEL_EXPORTER_OTLP_ENDPOINT`: Endpoint OpenTelemetry pour les traces

## Endpoints

- `GET /healthz`: Health check
- `GET /readyz`: Readiness check
- `GET /metrics`: Métriques Prometheus
- `GET /v1/info`: Informations publiques du service
- `GET /v1/hello`: Endpoint protégé (nécessite JWT)
- `GET /v1/admin`: Endpoint admin (nécessite rôle admin)

## Authentification

Le service valide les tokens JWT via les clés publiques Keycloak (JWKS).
Les tokens doivent contenir l'audience spécifiée dans `OIDC_AUDIENCE`.

## Développement

```bash
pip install -e .
uvicorn app.main:app --reload --host 0.0.0.0 --port 7000
```

## Tests

```bash
pip install -e ".[dev]"
pytest
```

## Production

```bash
python -m uvicorn app.main:app --host 0.0.0.0 --port 7000
```

## Docker

```bash
docker build -t backend-python-template .
docker run -p 7000:7000 -p 9464:9464 backend-python-template
```

## Formatage du code

```bash
black app/
isort app/
flake8 app/
```
