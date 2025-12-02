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

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const frontUrl = configService.get<string>('FRONT_URL') ?? 'http://localhost:4200';
  const isProduction = configService.get<string>('NODE_ENV') === 'production';
  const allowedOrigins = getAllowedOrigins(frontUrl, isProduction);

  // Enable CORS for frontend
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  const globalPrefix = 'v1';
  app.setGlobalPrefix(globalPrefix);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  );
  const port = configService.get<number>('SERVER_PORT', 3000);
  const hostname = configService.get<string>('SERVER_HOST', '0.0.0.0');
  await app.listen(port, hostname);
  Logger.log(
    `🚀 Application is running on: http://${hostname}:${port}/${globalPrefix}`
  );
}

bootstrap();
