import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const globalPrefix = configService.getOrThrow<string>('globalPrefix');
  const corsOrigin = configService.getOrThrow<string>('corsOrigin');
  const port = configService.getOrThrow<number>('port');

  app.setGlobalPrefix(globalPrefix);
  app.enableCors({ origin: corsOrigin === '*' ? true : corsOrigin.split(',').map((s) => s.trim()) });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Sterenova API')
    .setDescription('Endpoints de génération SVG et motion')
    .setVersion('1.0.0')
    .addTag('templates')
    .addTag('motion')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${globalPrefix}/docs`, app, document);

  await app.listen(port);
}
bootstrap();
