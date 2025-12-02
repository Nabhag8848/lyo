import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { GoogleOAuthUserDto } from './dtos';
import { UserEntity } from '../../database/entities';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: jest.Mocked<JwtService>;
  let configService: jest.Mocked<ConfigService>;
  let userService: jest.Mocked<UserService>;

  const mockUser: UserEntity = {
    id: 'user-123',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    picture: 'https://example.com/pic.jpg',
    provider: 'google',
    providerId: 'google-123',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLoginAt: new Date(),
  } as UserEntity;

  const mockGoogleUser: GoogleOAuthUserDto = {
    googleId: 'google-123',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    picture: 'https://example.com/pic.jpg',
    accessToken: 'google-access-token',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            verifyAsync: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            upsertGoogleUser: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get(JwtService);
    configService = module.get(ConfigService);
    userService = module.get(UserService);
  });

  describe('validateGoogleUser', () => {
    it('should upsert user and generate tokens', async () => {
      userService.upsertGoogleUser.mockResolvedValue(mockUser);
      configService.get.mockReturnValue('15m');
      jwtService.signAsync.mockResolvedValueOnce('access-token');

      const result = await service.validateGoogleUser(mockGoogleUser);

      expect(userService.upsertGoogleUser).toHaveBeenCalledWith(mockGoogleUser);
      expect(result).toEqual({
        accessToken: 'access-token',
        expiresIn: 900, // 15 minutes in seconds
      });
    });
  });

  describe('generateTokens', () => {
    it('should generate access token with correct expiration', async () => {
      configService.get.mockReturnValueOnce('15m'); // JWT_ACCESS_EXPIRATION

      jwtService.signAsync.mockResolvedValueOnce('access-token');

      const result = await service.generateTokens(
        'user-123',
        'test@example.com'
      );

      expect(jwtService.signAsync).toHaveBeenCalledTimes(1);
      expect(jwtService.signAsync).toHaveBeenCalledWith(
        { sub: 'user-123', email: 'test@example.com' },
        { expiresIn: 900 }
      );
      expect(result).toEqual({
        accessToken: 'access-token',
        expiresIn: 900,
      });
    });

    it('should use default expiration if config is missing', async () => {
      configService.get.mockReturnValue(undefined);
      jwtService.signAsync.mockResolvedValueOnce('access-token');

      await service.generateTokens('user-123', 'test@example.com');

      expect(jwtService.signAsync).toHaveBeenCalledTimes(1);
      expect(jwtService.signAsync).toHaveBeenCalledWith(
        expect.any(Object),
        { expiresIn: 900 } // default 15m
      );
    });
  });
});
