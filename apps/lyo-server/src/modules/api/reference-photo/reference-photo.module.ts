import { Module } from '@nestjs/common';
import { ReferencePhotoController } from './reference-photo.controller';
import { ReferencePhotoService } from './reference-photo.service';
import { S3Module } from '@/modules/storage/s3/s3.module';
import { UserModule } from '@/modules/api/user/user.module';
import { RedisModule } from '@/database/redis/redis.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferencePhotoEntity } from '@/database/entities';
import { AvatarModule } from '@/modules/api/avatar/avatar.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReferencePhotoEntity]),
    S3Module,
    UserModule,
    RedisModule,
    AvatarModule,
  ],
  controllers: [ReferencePhotoController],
  providers: [ReferencePhotoService],
  exports: [ReferencePhotoService],
})
export class ReferencePhotoModule {}
