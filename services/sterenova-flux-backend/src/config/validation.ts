import * as Joi from 'joi';

export const validationSchema = Joi.object({
  APP_PORT: Joi.number().default(3002),
  APP_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  
  DB_HOST: Joi.string().default('postgres'),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().default('platform'),
  DB_PASSWORD: Joi.string().default('platform'),
  DB_DATABASE: Joi.string().default('platform'),
  
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default('24h'),
  
  SWAGGER_TITLE: Joi.string().default('Sterenova Flux API'),
  SWAGGER_DESCRIPTION: Joi.string().default('API pour la gestion des devis et factures'),
  SWAGGER_VERSION: Joi.string().default('1.0'),
});
