# Backend Node.js Template

Template de microservice Node.js avec authentification JWT, métriques Prometheus et tracing OpenTelemetry.

## Variables d'environnement

- `SERVICE_NAME`: Nom du service (défaut: backend-node-template)
- `SERVICE_VERSION`: Version du service (défaut: 0.1.0)
- `PORT`: Port d'écoute HTTP (défaut: 7000)
- `PROMETHEUS_PORT`: Port des métriques Prometheus (défaut: 9464)
- `LOG_LEVEL`: Niveau de log (défaut: info)
- `NODE_ENV`: Environnement (development/production)
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
npm run dev
```

## Production

```bash
npm start
```

## Docker

```bash
docker build -t backend-node-template .
docker run -p 7000:7000 -p 9464:9464 backend-node-template
```
