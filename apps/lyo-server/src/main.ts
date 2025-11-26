/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'v1';
  app.setGlobalPrefix(globalPrefix);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('SERVER_PORT', 3000);
  const hostname = configService.get<string>('SERVER_HOST', '0.0.0.0');
  await app.listen(port, hostname);
  Logger.log(
    `🚀 Application is running on: http://${hostname}:${port}/${globalPrefix}`
  );
}

bootstrap();
