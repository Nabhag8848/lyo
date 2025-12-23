import { JobStatus } from '@/database/@types';
import { GenerationEntity } from '@/database/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3BucketService } from '@/modules/storage/s3/services/s3-bucket.service';

export class GenerationService {
  constructor(
    @InjectRepository(GenerationEntity)
    private generationRepository: Repository<GenerationEntity>,
    private readonly s3BucketService: S3BucketService
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
}
