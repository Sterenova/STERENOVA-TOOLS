export default () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '3000', 10),
  globalPrefix: process.env.GLOBAL_PREFIX ?? 'api',
  corsOrigin: process.env.CORS_ORIGIN ?? '*',
  database: {
    host: process.env.DB_HOST ?? 'postgres',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    user: process.env.DB_USER ?? 'platform',
    password: process.env.DB_PASSWORD ?? 'platform',
    name: process.env.DB_NAME ?? 'platform',
    synchronize: (process.env.TYPEORM_SYNCHRONIZE ?? 'true') === 'true',
    ssl: (process.env.DB_SSL ?? 'false') === 'true',
  },
  keycloak: {
    url: process.env.KEYCLOAK_URL ?? 'http://localhost:8080',
    realm: process.env.KEYCLOAK_REALM ?? 'platform',
    clientId: process.env.KEYCLOAK_CLIENT_ID ?? 'backend-service',
    clientSecret: process.env.KEYCLOAK_CLIENT_SECRET ?? 'backend-secret',
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? 'sterenova-studio-secret',
    expiresIn: process.env.JWT_EXPIRES_IN ?? '24h',
  },
}); 