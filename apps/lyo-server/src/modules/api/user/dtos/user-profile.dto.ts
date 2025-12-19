import { Expose } from 'class-transformer';
import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserProfileDto {
  @Expose()
  @IsEmail()
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  email: string;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'User first name',
    example: 'John',
    nullable: true,
  })
  firstName: string | null;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'User last name',
    example: 'Doe',
    nullable: true,
  })
  lastName: string | null;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'User profile picture URL',
    example: 'https://example.com/avatar.jpg',
    nullable: true,
  })
  picture: string | null;

  @Expose()
  @IsDate()
  @ApiProperty({
    description: 'Account creation timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;
}
