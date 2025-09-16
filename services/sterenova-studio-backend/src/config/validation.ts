import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  PORT: Joi.number().port().default(3000),
  GLOBAL_PREFIX: Joi.string().default('api'),
  CORS_ORIGIN: Joi.string().default('*'),

  DB_HOST: Joi.string().default('postgres'),
  DB_PORT: Joi.number().port().default(5432),
  DB_USER: Joi.string().default('platform'),
  DB_PASSWORD: Joi.string().allow('').default('platform'),
  DB_NAME: Joi.string().default('platform'),
  TYPEORM_SYNCHRONIZE: Joi.boolean().truthy('true').falsy('false').default(true),
  DB_SSL: Joi.boolean().truthy('true').falsy('false').default(false),
}); 