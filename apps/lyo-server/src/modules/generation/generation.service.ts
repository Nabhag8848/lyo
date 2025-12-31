import { Injectable, NotFoundException } from '@nestjs/common';
import { JobStatus } from '@/database/@types';
import { GenerationEntity } from '@/database/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { S3BucketService } from '@/modules/storage/s3/services/s3-bucket.service';
import { S3ObjectService } from '@/modules/storage/s3/services/s3-object.service';
import {
  GetGenerationImageUrlResponseDto,
  GenerationsResponseDto,
  GenerationWithGarmentDto,
} from './dtos';
import encodeCursor from '@/modules/api/wardrobe/utils/encode-cursor.util';
import decodeCursor from '@/modules/api/wardrobe/utils/decode-cursor.util';

@Injectable()
export class GenerationService {
  constructor(
    @InjectRepository(GenerationEntity)
    private readonly generationRepository: Repository<GenerationEntity>,
    private readonly s3BucketService: S3BucketService,
    private readonly s3ObjectService: S3ObjectService
  ) {}

  async createGeneration(
    userId: string,
    garmentId: string,
    avatarId: string,
    jobId: string
  ) {
    await this.generationRepository.insert({
      user: { id: userId },
      garment: { id: garmentId },
      avatar: { id: avatarId },
      jobId,
      status: JobStatus.STARTING,
    });
  }

  async updateGeneration(jobId: string, status: JobStatus, key: string) {
    const bucketName = this.s3BucketService.getBucketName();
    await this.generationRepository.update(
      {
        jobId,
      },
      {
        status,
        key,
        bucketName,
        contentType: 'image/jpeg',
      }
    );
  }

  async hasPendingGenerations(userId: string): Promise<boolean> {
    const count = await this.generationRepository.count({
      where: {
        user: { id: userId },
        status: In([
          JobStatus.STARTING,
          JobStatus.IN_QUEUE,
          JobStatus.PROCESSING,
        ]),
      },
    });
    return count > 0;
  }

  async getGenerationImageUrl(
    jobId: string,
    key: string
  ): Promise<GetGenerationImageUrlResponseDto> {
    const generation = await this.generationRepository.findOne({
      where: {
        jobId,
      },
      select: {
        id: true,
      },
    });

    if (!generation) {
      throw new NotFoundException('Generation not found');
    }

    const imageUrl = await this.s3ObjectService.get(key);

    return {
      id: generation.id,
      imageUrl,
    };
  }

  async getGenerationIdByJobId(jobId: string): Promise<string> {
    const generation = await this.generationRepository.findOne({
      where: {
        jobId,
      },
      select: {
        id: true,
      },
    });

    if (!generation) {
      throw new NotFoundException('Generation not found');
    }

    return generation.id;
  }

  async getGenerationsWithGarmentsByUserId(
    userId: string,
    limit: number,
    cursor?: string
  ): Promise<GenerationsResponseDto> {
    const queryBuilder = this.generationRepository
      .createQueryBuilder('generation')
      .leftJoinAndSelect('generation.garment', 'garment')
      .where('generation.userId = :userId', { userId })
      .andWhere('generation.status = :status', { status: JobStatus.COMPLETED })
      .andWhere('generation.key IS NOT NULL')
      .orderBy('generation.createdAt', 'DESC')
      .addOrderBy('generation.id', 'DESC')
      .take(limit + 1)
      .select([
        'generation.key',
        'generation.createdAt',
        'generation.id',
        'garment.id',
        'garment.garmentUrl',
        'garment.sourceUrl',
        'garment.brandName',
        'garment.garmentBrandName',
        'garment.garmentName',
        'garment.garmentDescription',
      ]);

    if (cursor) {
      const { createdAt, id } = decodeCursor(cursor);
      queryBuilder.andWhere(
        '(generation.createdAt < :timestamp OR (generation.createdAt = :timestamp AND generation.id < :id))',
        {
          timestamp: createdAt,
          id,
        }
      );
    }

    const generations = await queryBuilder.getMany();

    const hasNextPage = generations.length > limit;
    const items = hasNextPage ? generations.slice(0, limit) : generations;

    const generationsWithGarments: GenerationWithGarmentDto[] = items
      .filter(
        (
          generation
        ): generation is GenerationEntity & {
          key: string;
          garment: NonNullable<GenerationEntity['garment']>;
        } => generation.key !== null && generation.garment !== undefined
      )
      .map((generation) => ({
        key: generation.key,
        id: generation.id,
        createdAt: generation.createdAt,
        garment: {
          id: generation.garment.id,
          garmentUrl: generation.garment.garmentUrl,
          sourceUrl: generation.garment.sourceUrl,
          brandName: generation.garment.brandName,
          garmentBrandName: generation.garment.garmentBrandName,
          garmentName: generation.garment.garmentName,
          garmentDescription: generation.garment.garmentDescription,
        },
      }));

    const lastGeneration =
      generationsWithGarments.length > 0
        ? generationsWithGarments[generationsWithGarments.length - 1]
        : null;

    const nextCursor =
      hasNextPage && lastGeneration
        ? encodeCursor(lastGeneration.createdAt, lastGeneration.id)
        : null;

    return { generations: generationsWithGarments, nextCursor };
  }
}
