import { Injectable, NotFoundException } from '@nestjs/common';
import { JobStatus } from '@/database/@types';
import { GenerationEntity } from '@/database/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { S3BucketService } from '@/modules/storage/s3/services/s3-bucket.service';
import { S3ObjectService } from '@/modules/storage/s3/services/s3-object.service';
import { GetGenerationImageUrlResponseDto } from './dtos';

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
}
