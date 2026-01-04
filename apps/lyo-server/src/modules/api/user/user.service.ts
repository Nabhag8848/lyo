import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@/database/entities';
import { GoogleOAuthUserDto } from '@/modules/auth/dtos';
import { AuthProvider } from '../../../database/@types';
import { RedisService } from '@/database/redis/redis.service';
import { parseJson, stringifyJson } from '@/utils';
import { UserProfileSchema } from './schema';
import { UserProfileDto } from './dtos';

@Injectable()
export class UserService {
  private readonly CACHE_TTL = 3600; // 1 hour
  private readonly getCacheKey = (userId: string) => `users:${userId}:profile`;

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly redisService: RedisService
  ) {}

  async findByIdOrFail(id: string): Promise<UserProfileDto> {
    const cacheKey = this.getCacheKey(id);
    const redis = this.redisService.getClient();

    const cached = await redis.get(cacheKey);
    const parsedCachedUser = parseJson(UserProfileSchema, cached);

    if (parsedCachedUser) {
      return parsedCachedUser;
    }

    const user = await this.userRepository.findOneOrFail({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        picture: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    await redis.setex(
      cacheKey,
      this.CACHE_TTL,
      stringifyJson(UserProfileSchema, user)
    );

    return user;
  }

  async clearGoogleToken(userId: string): Promise<void> {
    await this.userRepository.update(
      { id: userId },
      { googleAccessToken: null }
    );
    await this.invalidateCache(userId);
  }

  async upsertGoogleUser(dto: GoogleOAuthUserDto) {
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

    // Invalidate cache if user exists
    if (existingUser?.id) {
      await this.invalidateCache(existingUser.id);
    }

    return this.userRepository.findOneOrFail({
      where: { email: dto.email },
      select: { id: true, email: true },
    });
  }

  async isUserActive(userId: string): Promise<boolean> {
    const { isActive } = await this.userRepository.findOneOrFail({
      where: { id: userId },
      select: { isActive: true },
    });
    return isActive;
  }

  private async invalidateCache(userId: string): Promise<void> {
    const cacheKey = this.getCacheKey(userId);
    const redis = this.redisService.getClient();
    await redis.del(cacheKey);
  }
}
