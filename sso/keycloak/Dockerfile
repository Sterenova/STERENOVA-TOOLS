FROM quay.io/keycloak/keycloak:24.0

# Copy realm configuration
COPY realm-export.json /opt/keycloak/data/import/realm-export.json

# Set environment variables
ENV KEYCLOAK_ADMIN=admin
ENV KEYCLOAK_ADMIN_PASSWORD=admin
ENV KC_DB=postgres
ENV KC_DB_URL=jdbc:postgresql://postgres:5432/platform
ENV KC_DB_USERNAME=platform
ENV KC_DB_PASSWORD=platform
ENV KC_HOSTNAME_STRICT=false
ENV KC_HOSTNAME_STRICT_HTTPS=false
ENV KC_HTTP_ENABLED=true
ENV KC_PROXY=edge

# Start in development mode with realm import
CMD ["start-dev", "--import-realm", "--http-enabled=true", "--proxy=edge", "--hostname-strict=false", "--hostname-strict-https=false"]
