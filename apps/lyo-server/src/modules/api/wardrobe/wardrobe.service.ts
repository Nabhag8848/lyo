import { GenerationService } from '@/modules/generation/generation.service';
import { Injectable } from '@nestjs/common';
import { S3ObjectService } from '@/modules/storage/s3/services/s3-object.service';
import { WardrobeResponseDto } from './dtos/wardrobe.dto';

@Injectable()
export class WardrobeService {
  constructor(
    private readonly generationService: GenerationService,
    private readonly s3ObjectService: S3ObjectService
  ) {}

  async getWardrobe(
    userId: string,
    limit: number,
    cursor?: string
  ): Promise<WardrobeResponseDto> {
    const { generations, nextCursor } =
      await this.generationService.getGenerationsWithGarmentsByUserId(
        userId,
        limit,
        cursor
      );

    // Get signed URLs from S3 for all keys and map to items with id and garment info
    const wardrobe = await Promise.all(
      generations.map(async (generation) => {
        const { key, id, garment } = generation;
        const signedUrl = await this.s3ObjectService.get(key);
        return {
          id,
          signedUrl,
          garment,
        };
      })
    );

    return {
      wardrobe,
      nextCursor,
    };
  }
}
