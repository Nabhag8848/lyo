import { AvatarEntity } from '@/database/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class AvatarService {
  constructor(
    @InjectRepository(AvatarEntity)
    private readonly avatarRepository: Repository<AvatarEntity>
  ) {}

  async createAvatar(
    userId: string,
    referencePhotoId: string,
    contentType: string,
    key: string,
    bucketName: string
  ) {
    await this.avatarRepository.insert({
      user: { id: userId },
      referencePhoto: { id: referencePhotoId },
      key,
      bucketName,
      contentType,
      isSelected: true,
    });
  }

  async deSelectCurrentAvatar(userId: string) {
    await this.avatarRepository.update(
      {
        user: { id: userId },
        isSelected: true,
      },
      { isSelected: false }
    );
  }

  async getCurrentAvatarId(userId: string): Promise<string> {
    const avatar = await this.avatarRepository.findOneOrFail({
      where: {
        user: { id: userId },
        isSelected: true,
      },
    });

    return avatar.id;
  }
}
