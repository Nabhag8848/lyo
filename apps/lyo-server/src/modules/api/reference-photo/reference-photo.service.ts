import { Injectable, NotFoundException } from '@nestjs/common';
import { S3ObjectService } from '@/modules/storage/s3/services/s3-object.service';
import { RedisService } from '@/database/redis/redis.service';
import { ReferencePhotoDto } from './dtos/reference-photo.dto';
import { randomUUID } from 'crypto';
import { ReferencePhotoEntity } from '@/database/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { S3BucketService } from '@/modules/storage/s3/services/s3-bucket.service';
import { CachedReferencePhotoSchema } from './schema';
import { parseJson, stringifyJson } from './utils';
import { AvatarService } from '@/modules/api/avatar/avatar.service';

@Injectable()
export class ReferencePhotoService {
  private readonly CACHE_TTL = 3600;
  private readonly getCacheKey = (userId: string) => {
    return `users:${userId}:reference-photo:active`;
  };

  constructor(
    private readonly s3ObjectService: S3ObjectService,
    private readonly redisService: RedisService,
    private readonly s3BucketService: S3BucketService,
    @InjectRepository(ReferencePhotoEntity)
    private readonly referencePhotoRepository: Repository<ReferencePhotoEntity>,
    private readonly dataSource: DataSource,
    private readonly avatarService: AvatarService
  ) {}

  async uploadReferencePhoto(
    file: MulterFile,
    userId: string
  ): Promise<ReferencePhotoDto> {
    // File validation is handled by ImageFilePipe in the controller
    const photoId = randomUUID();
    const key = `users/${userId}/reference-photo/${photoId}`;
    const bucketName = this.s3BucketService.getBucketName();
    await this.s3ObjectService.put(key, file.buffer, {
      ContentType: file.mimetype,
    });
    const contentType = file.mimetype;
    let referencePhotoId!: string;

    await this.dataSource.transaction(async (manager) => {
      const referencePhotoRepository =
        manager.getRepository(ReferencePhotoEntity);
      await referencePhotoRepository.update(
        {
          user: { id: userId },
          isActive: true,
        },
        {
          isActive: false,
        }
      );
      const referencePhoto = await referencePhotoRepository.insert({
        user: { id: userId },
        key,
        bucketName,
        contentType,
      });

      referencePhotoId = referencePhoto.identifiers[0]?.id;
    });

    await this.avatarService.createAvatar(
      userId,
      referencePhotoId,
      contentType,
      key,
      bucketName
    );

    await this.invalidateCache(userId);

    return {
      id: referencePhotoId,
    };
  }

  async getActiveReferencePhoto(userId: string): Promise<ReferencePhotoDto> {
    const cacheKey = this.getCacheKey(userId);
    const redis = this.redisService.getClient();

    const cachedActiveReferencePhoto = await redis.get(cacheKey);
    const parseCachedActiveReferencePhoto = parseJson(
      CachedReferencePhotoSchema,
      cachedActiveReferencePhoto
    );

    if (parseCachedActiveReferencePhoto) {
      const { photoId, accessUrl } = parseCachedActiveReferencePhoto;
      return {
        id: photoId,
        url: accessUrl,
      };
    }

    const activeReferencePhoto = await this.referencePhotoRepository.findOne({
      where: {
        user: { id: userId },
        isActive: true,
      },
    });

    if (!activeReferencePhoto) {
      throw new NotFoundException('No active reference photo found');
    }

    const photoId = activeReferencePhoto.id;
    const key = activeReferencePhoto.key;
    const accessUrl = await this.s3ObjectService.get(key);

    // we have to store the photoId and the accessUrl in the cache
    await redis.setex(
      cacheKey,
      this.CACHE_TTL,
      stringifyJson(CachedReferencePhotoSchema, {
        photoId,
        key,
        accessUrl,
      })
    );

    return {
      id: photoId,
      url: accessUrl,
    };
  }

  async deleteActiveReferencePhoto(userId: string): Promise<void> {
    const cacheKey = this.getCacheKey(userId);
    const redis = this.redisService.getClient();

    const cachedActiveReferencePhoto = await redis.get(cacheKey);
    const parseCachedActiveReferencePhoto = parseJson(
      CachedReferencePhotoSchema,
      cachedActiveReferencePhoto
    );

    if (parseCachedActiveReferencePhoto) {
      const { photoId } = parseCachedActiveReferencePhoto;
      await this.referencePhotoRepository.update(
        {
          id: photoId,
        },
        {
          isActive: false,
        }
      );
      await this.invalidateCache(userId);
    } else {
      const activeReferencePhoto = await this.referencePhotoRepository.findOne({
        where: {
          user: { id: userId },
          isActive: true,
        },
      });

      if (!activeReferencePhoto) {
        throw new NotFoundException('No active reference photo found');
      }

      await this.referencePhotoRepository.update(
        {
          id: activeReferencePhoto.id,
        },
        {
          isActive: false,
        }
      );

      await this.invalidateCache(userId);
    }

    await this.avatarService.deSelectCurrentAvatar(userId);
  }

  private async invalidateCache(userId: string): Promise<void> {
    const cacheKey = this.getCacheKey(userId);
    const redis = this.redisService.getClient();
    await redis.del(cacheKey);
  }
}
