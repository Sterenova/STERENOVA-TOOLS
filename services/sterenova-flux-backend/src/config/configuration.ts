export default () => ({
  port: parseInt(process.env.APP_PORT, 10) || 3002,
  environment: process.env.APP_ENV || 'development',
  database: {
    host: process.env.DB_HOST || 'postgres',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'platform',
    password: process.env.DB_PASSWORD || 'platform',
    database: process.env.DB_DATABASE || 'platform',
  },
  keycloak: {
    url: process.env.KEYCLOAK_URL || 'http://localhost:8080',
    realm: process.env.KEYCLOAK_REALM || 'platform',
    clientId: process.env.KEYCLOAK_CLIENT_ID || 'backend-service',
    clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || 'backend-secret',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'sterenova-flux-secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },
  swagger: {
    title: process.env.SWAGGER_TITLE || 'Sterenova Flux API',
    description: process.env.SWAGGER_DESCRIPTION || 'API pour la gestion des devis et factures',
    version: process.env.SWAGGER_VERSION || '1.0',
  },
});
