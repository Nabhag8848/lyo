import { Module } from '@nestjs/common';
import { AvatarController } from './avatar.controller';
import { AvatarService } from './avatar.service';
import { S3Module } from '@/modules/storage/s3/s3.module';
import { UserModule } from '@/modules/api/user/user.module';

@Module({
  imports: [S3Module, UserModule],
  controllers: [AvatarController],
  providers: [AvatarService],
  exports: [AvatarService],
})
export class AvatarModule {}
