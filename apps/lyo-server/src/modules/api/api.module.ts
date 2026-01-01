import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { UserModule } from './user/user.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { ReferencePhotoModule } from './reference-photo/reference-photo.module';
import { TryonModule } from './tryon/tryon.module';
import { AvatarModule } from './avatar/avatar.module';
import { WardrobeModule } from './wardrobe/wardrobe.module';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import { RedisModule, RedisService } from '@/database/redis';
import { ExecutionContext } from '@nestjs/common';
import { createHash } from 'crypto';

@Module({
  imports: [
    RedisModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule, RedisModule],
      inject: [ConfigService, RedisService],
      useFactory: (
        configService: ConfigService,
        redisService: RedisService
      ) => {
        return {
          throttlers: [
            {
              ttl: configService.get<number>('THROTTLE_TTL', 60000),
              limit: configService.get<number>('THROTTLE_LIMIT', 30),
            },
          ],
          storage: new ThrottlerStorageRedisService(redisService.getClient()),
          generateKey: (
            context: ExecutionContext,
            trackerString: string,
            throttlerName: string
          ) => {
            const controller = context.getClass().name;
            const handler = context.getHandler().name;
            const prefix = `${controller}-${
              handler
            }-${throttlerName}`;
            const hash = createHash('sha256')
              .update(`${prefix}-${trackerString}`)
              .digest('hex');
            return `ratelimit:${hash}`;
          },
        };
      },
    }),
    UserModule,
    AuthModule,
    ReferencePhotoModule,
    TryonModule,
    AvatarModule,
    WardrobeModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class ApiModule {}
