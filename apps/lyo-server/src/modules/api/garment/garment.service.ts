import { GarmentEntity } from '@/database/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class GarmentService {
  constructor(
    @InjectRepository(GarmentEntity)
    private garmentRepository: Repository<GarmentEntity>
  ) {}

  async createGarment(
    userId: string,
    garmentUrl: string,
    sourceUrl: string
  ): Promise<GarmentEntity> {
    const garment = await this.garmentRepository.insert({
      user: { id: userId },
      garmentUrl,
      sourceUrl,
    });

    return garment.raw[0];
  }
}
