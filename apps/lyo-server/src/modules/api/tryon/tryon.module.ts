import { Module } from '@nestjs/common';
import { TryonController } from './tryon.controller';
import { TryonService } from './tryon.service';
import { FashnaiModule } from '@/modules/fashnai/fashnai.module';
import { S3Module } from '@/modules/storage/s3/s3.module';
import { ReferencePhotoModule } from '@/modules/api/reference-photo/reference-photo.module';
import { AvatarModule } from '@/modules/api/avatar/avatar.module';
import { GarmentModule } from '@/modules/api/garment/garment.module';
import { GenerationModule } from '@/modules/generation/generation.module';

@Module({
  imports: [
    FashnaiModule,
    S3Module,
    ReferencePhotoModule,
    AvatarModule,
    GarmentModule,
    GenerationModule,
  ],
  controllers: [TryonController],
  providers: [TryonService],
})
export class TryonModule {}
