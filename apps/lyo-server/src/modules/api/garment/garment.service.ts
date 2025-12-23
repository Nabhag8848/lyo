import { GarmentEntity } from '@/database/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class GarmentService {
  constructor(
    @InjectRepository(GarmentEntity)
    private readonly garmentRepository: Repository<GarmentEntity>
  ) {}

  async createGarment(
    userId: string,
    garmentUrl: string,
    sourceUrl: string,
    garmentBrandName?: string,
    garmentName?: string,
    garmentDescription?: string,
    brandName?: string
  ): Promise<GarmentEntity> {
    const garment = await this.garmentRepository.insert({
      user: { id: userId },
      garmentUrl,
      sourceUrl,
      brandName,
      garmentName,
      garmentDescription,
      garmentBrandName,
    });

    return garment.raw[0];
  }
}
