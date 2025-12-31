import { S3Module } from '@/modules/storage/s3/s3.module';
import { Module } from '@nestjs/common';
import { WardrobeController } from './wardrobe.controller';
import { GenerationModule } from '@/modules/generation/generation.module';
import { UserModule } from '@/modules/api/user/user.module';
import { WardrobeService } from './wardrobe.service';

@Module({
  imports: [GenerationModule, S3Module, UserModule],
  controllers: [WardrobeController],
  providers: [WardrobeService],
})
export class WardrobeModule {}
