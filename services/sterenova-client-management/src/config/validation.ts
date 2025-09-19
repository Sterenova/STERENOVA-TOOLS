import * as Joi from 'joi';

export const validationSchema = Joi.object({
  APP_PORT: Joi.number().default(3004),
  APP_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  
  // Database
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  
  // Keycloak
  KEYCLOAK_URL: Joi.string().required(),
  KEYCLOAK_REALM: Joi.string().required(),
  KEYCLOAK_CLIENT_ID: Joi.string().required(),
  KEYCLOAK_CLIENT_SECRET: Joi.string().required(),
  
  // JWT
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default('24h'),
  
  // Swagger
  SWAGGER_TITLE: Joi.string().default('Sterenova Client Management API'),
  SWAGGER_DESCRIPTION: Joi.string().default('API pour la gestion centralisée des clients'),
  SWAGGER_VERSION: Joi.string().default('1.0'),
});
