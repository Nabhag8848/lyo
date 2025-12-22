/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import 'reflect-metadata';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { getAllowedOrigins } from './utils';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import './instrument';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });
  const configService = app.get(ConfigService);

  const frontUrl =
    configService.get<string>('FRONT_URL') ?? 'http://localhost:4200';
  const appUrl =
    configService.get<string>('APP_URL') ?? 'http://localhost:3001';
  const isProduction = configService.get<string>('NODE_ENV') === 'production';
  const allowedOrigins = getAllowedOrigins(frontUrl, appUrl, isProduction);

  app.use(helmet());
  // Enable CORS for frontend
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  const globalPrefix = 'v1';
  app.setGlobalPrefix(globalPrefix);

  // Swagger Configuration
  const serverUrl = configService.get<string>('SERVER_URL');
  const documentBuilder = new DocumentBuilder()
    .setTitle('Lyo API')
    .setDescription('API documentation for Lyo - Virtual Try-On Platform')
    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints')
    .addTag('user', 'User management endpoints')
    .addTag('reference-photo', 'Reference photo management endpoints')
    .addTag('tryon', 'Virtual try-on endpoints')
    .addTag('webhook', 'Webhook endpoints')
    .addTag('health', 'Health check endpoints')
    .addCookieAuth('access_token', {
      type: 'apiKey',
      in: 'cookie',
      name: 'access_token',
    });

  if (serverUrl) {
    documentBuilder.addServer(serverUrl);
  }

  const config = documentBuilder.build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    customSiteTitle: 'Lyo API Documentation',
  });

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  );

  app.useBodyParser('json', { limit: '10mb' });
  const port = configService.get<number>('SERVER_PORT', 3000);
  const hostname = configService.get<string>('SERVER_HOST', '0.0.0.0');
  await app.listen(port, hostname);
  Logger.log(
    `🚀 Application is running on: http://${hostname}:${port}/${globalPrefix}`,
    `${process.pid}`
  );
}

bootstrap();
