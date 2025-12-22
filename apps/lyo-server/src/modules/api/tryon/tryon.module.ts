import { Module } from '@nestjs/common';
import { TryonController } from './tryon.controller';
import { TryonService } from './tryon.service';
import { FashnaiModule } from '@/modules/fashnai/fashnai.module';
import { S3Module } from '@/modules/storage/s3/s3.module';
import { ReferencePhotoModule } from '@/modules/api/reference-photo/reference-photo.module';

@Module({
  imports: [FashnaiModule, S3Module, ReferencePhotoModule],
  controllers: [TryonController],
  providers: [TryonService],
})
export class TryonModule {}
