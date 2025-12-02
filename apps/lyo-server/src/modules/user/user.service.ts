import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@/database/entities';
import { AuthProvider } from '@/database/types';
import { GoogleOAuthUserDto } from '@/modules/auth/dtos';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async findByIdOrFail(id: string): Promise<UserEntity> {
    return this.userRepository.findOneOrFail({ where: { id } });
  }

  async upsertGoogleUser(dto: GoogleOAuthUserDto): Promise<UserEntity> {
    await this.userRepository.upsert(
      {
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        picture: dto.picture,
        providerId: dto.googleId,
        provider: AuthProvider.GOOGLE,
        lastLoginAt: new Date(),
      },
      ['email']
    );

    return this.userRepository.findOneOrFail({ where: { email: dto.email } });
  }
}
