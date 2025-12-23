import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GarmentEntity } from '@/database/entities';
import { GarmentService } from './garment.service';

@Module({
  imports: [TypeOrmModule.forFeature([GarmentEntity])],
  providers: [GarmentService],
  exports: [GarmentService],
})  
export class GarmentModule {}