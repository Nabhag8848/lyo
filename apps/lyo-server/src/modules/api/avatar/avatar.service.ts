import { Injectable, BadRequestException } from '@nestjs/common';
import { S3ObjectService } from '@/modules/storage/s3/services/s3-object.service';
import { RedisService } from '@/database/redis/redis.service';
import { AvatarDto } from './dtos/avatar.dto';

@Injectable()
export class AvatarService {
  private readonly CACHE_TTL = 3600;
  private readonly CACHE_KEY_PREFIX = 'avatar:';

  constructor(
    private s3ObjectService: S3ObjectService,
    private redisService: RedisService
  ) {}

  async uploadAvatar(file: MulterFile, userId: string): Promise<AvatarDto> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
    const key = `users/${userId}/avatar/uploaded_avatar`;
    await this.s3ObjectService.put(key, file.buffer, {
      ContentType: file.mimetype,
    });

    await this.invalidateCache(userId);

    return {
      id: userId,
    };
  }

  async getAvatar(userId: string): Promise<AvatarDto> {
    const cacheKey = `${this.CACHE_KEY_PREFIX}${userId}`;
    const redis = this.redisService.getClient();

    const cachedUrl = await redis.get(cacheKey);
    if (cachedUrl) {
      return {
        id: userId,
        url: cachedUrl,
      };
    }

    const key = `users/${userId}/avatar/uploaded_avatar`;
    const accessUrl = await this.s3ObjectService.get(key);

    await redis.setex(cacheKey, this.CACHE_TTL, accessUrl);

    return {
      id: userId,
      url: accessUrl,
    };
  }

  async deleteAvatar(userId: string): Promise<void> {
    const key = `users/${userId}/avatar/uploaded_avatar`;
    await this.s3ObjectService.delete(key);

    await this.invalidateCache(userId);
  }

  private async invalidateCache(userId: string): Promise<void> {
    const cacheKey = `${this.CACHE_KEY_PREFIX}${userId}`;
    const redis = this.redisService.getClient();
    await redis.del(cacheKey);
  }
}
