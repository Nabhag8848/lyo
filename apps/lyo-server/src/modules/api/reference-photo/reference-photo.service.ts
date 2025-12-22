import { Injectable, BadRequestException } from '@nestjs/common';
import { S3ObjectService } from '@/modules/storage/s3/services/s3-object.service';
import { RedisService } from '@/database/redis/redis.service';
import { ReferencePhotoDto } from './dtos/reference-photo.dto';

@Injectable()
export class ReferencePhotoService {
  private readonly CACHE_TTL = 3600;
  private readonly CACHE_KEY_PREFIX = 'reference-photo:';

  constructor(
    private s3ObjectService: S3ObjectService,
    private redisService: RedisService
  ) {}

  async uploadReferencePhoto(file: MulterFile, userId: string): Promise<ReferencePhotoDto> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
    const key = `users/${userId}/reference-photo/uploaded_reference_photo`;
    await this.s3ObjectService.put(key, file.buffer, {
      ContentType: file.mimetype,
    });

    await this.invalidateCache(userId);

    return {
      id: userId,
    };
  }

  async getReferencePhoto(userId: string): Promise<ReferencePhotoDto> {
    const cacheKey = `${this.CACHE_KEY_PREFIX}${userId}`;
    const redis = this.redisService.getClient();

    const cachedUrl = await redis.get(cacheKey);
    if (cachedUrl) {
      return {
        id: userId,
        url: cachedUrl,
      };
    }

    const key = `users/${userId}/reference-photo/uploaded_reference_photo`;
    const accessUrl = await this.s3ObjectService.get(key);

    await redis.setex(cacheKey, this.CACHE_TTL, accessUrl);

    return {
      id: userId,
      url: accessUrl,
    };
  }

  async deleteReferencePhoto(userId: string): Promise<void> {
    const key = `users/${userId}/reference-photo/uploaded_reference_photo`;
    await this.s3ObjectService.delete(key);

    await this.invalidateCache(userId);
  }

  private async invalidateCache(userId: string): Promise<void> {
    const cacheKey = `${this.CACHE_KEY_PREFIX}${userId}`;
    const redis = this.redisService.getClient();
    await redis.del(cacheKey);
  }
}
