import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@/database/entities';
import { GoogleOAuthUserDto } from '@/modules/auth/dtos';
import { AuthProvider } from '../../../database/@types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findByIdOrFail(id: string): Promise<UserEntity> {
    return this.userRepository.findOneOrFail({ where: { id } });
  }

  async clearGoogleToken(userId: string): Promise<void> {
    await this.userRepository.update(
      { id: userId },
      { googleAccessToken: null }
    );
  }

  async upsertGoogleUser(dto: GoogleOAuthUserDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOne({
      where: { email: dto.email },
      select: { isActive: true },
    });

    await this.userRepository.upsert(
      {
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        picture: dto.picture,
        providerId: dto.googleId,
        provider: AuthProvider.GOOGLE,
        lastLoginAt: new Date(),
        googleAccessToken: dto.accessToken,
        isActive: existingUser?.isActive ?? false,
      },
      ['email']
    );

    return this.userRepository.findOneOrFail({ where: { email: dto.email } });
  }

  async isUserActive(userId: string): Promise<boolean> {
    const { isActive } = await this.userRepository.findOneOrFail({
      where: { id: userId },
      select: { isActive: true },
    });
    return isActive;
  }
}
