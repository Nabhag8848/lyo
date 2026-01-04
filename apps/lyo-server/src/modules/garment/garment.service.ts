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
  ) {
    // upsert if garment for user and garmentUrl and sourceUrl already exists
    await this.garmentRepository.upsert(
      {
        user: { id: userId },
        garmentUrl,
        sourceUrl,
        brandName,
        garmentName,
        garmentDescription,
        garmentBrandName,
      },
      ['user', 'garmentUrl', 'sourceUrl']
    );

    return this.garmentRepository.findOneOrFail({
      where: { user: { id: userId }, garmentUrl, sourceUrl },
      select: { id: true },
    });
  }
}
