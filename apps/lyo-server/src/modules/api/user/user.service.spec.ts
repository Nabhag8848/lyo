import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { UserEntity } from '../../../database/entities';
import { GoogleOAuthUserDto } from '../auth/dtos';
import { AuthProvider } from '../../../database/@types';

describe('UserService', () => {
  let service: UserService;
  let repository: jest.Mocked<Repository<UserEntity>>;

  const mockUser: UserEntity = {
    id: 'user-123',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    picture: 'https://example.com/pic.jpg',
    provider: AuthProvider.GOOGLE,
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
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            upsert: jest.fn(),
            findOneOrFail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(getRepositoryToken(UserEntity));
  });

  describe('findByIdOrFail', () => {
    it('should return user when found', async () => {
      repository.findOneOrFail.mockResolvedValue(mockUser);

      const result = await service.findByIdOrFail('user-123');

      expect(repository.findOneOrFail).toHaveBeenCalledWith({
        where: { id: 'user-123' },
      });
      expect(result).toEqual(mockUser);
    });

    it('should throw error when user not found', async () => {
      repository.findOneOrFail.mockRejectedValue(new Error('Entity not found'));

      await expect(service.findByIdOrFail('invalid-id')).rejects.toThrow(
        'Entity not found'
      );
    });
  });

  describe('upsertGoogleUser', () => {
    it('should upsert user with correct data', async () => {
      repository.upsert.mockResolvedValue({} as any);
      repository.findOneOrFail.mockResolvedValue(mockUser);

      const result = await service.upsertGoogleUser(mockGoogleUser);

      expect(repository.upsert).toHaveBeenCalledWith(
        {
          email: mockGoogleUser.email,
          firstName: mockGoogleUser.firstName,
          lastName: mockGoogleUser.lastName,
          picture: mockGoogleUser.picture,
          providerId: mockGoogleUser.googleId,
          provider: AuthProvider.GOOGLE,
          lastLoginAt: expect.any(Date),
        },
        ['email']
      );
      expect(repository.findOneOrFail).toHaveBeenCalledWith({
        where: { email: mockGoogleUser.email },
      });
      expect(result).toEqual(mockUser);
    });

    it('should update existing user when email matches', async () => {
      const updatedUser = { ...mockUser, firstName: 'Jane' } as UserEntity;
      repository.upsert.mockResolvedValue({} as any);
      repository.findOneOrFail.mockResolvedValue(updatedUser);

      const result = await service.upsertGoogleUser({
        ...mockGoogleUser,
        firstName: 'Jane',
      });

      expect(repository.upsert).toHaveBeenCalled();
      expect(result.firstName).toBe('Jane');
    });
  });
});
