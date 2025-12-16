import { Injectable, BadRequestException } from '@nestjs/common';
import { S3ObjectService } from '@/modules/storage/s3/services/s3-object.service';
import { AvatarDto } from './dtos/avatar.dto';

@Injectable()
export class AvatarService {
  constructor(private s3ObjectService: S3ObjectService) {}

  async uploadAvatar(file: MulterFile, userId: string): Promise<AvatarDto> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
    const key = `users/${userId}/avatar/uploaded_avatar`;
    await this.s3ObjectService.put(key, file.buffer, {
      ContentType: file.mimetype,
    });

    return {
      id: userId,
    };
  }

  async getAvatar(userId: string): Promise<AvatarDto> {
    const key = `users/${userId}/avatar/uploaded_avatar`;
    const accessUrl = await this.s3ObjectService.get(key);

    return {
      id: userId,
      url: accessUrl,
    };
  }

  async deleteAvatar(userId: string): Promise<void> {
    const key = `users/${userId}/avatar/uploaded_avatar`;
    await this.s3ObjectService.delete(key);
  }
}
