import { IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GoogleOAuthUserDto {
  @IsString()
  @ApiProperty({
    description: 'Google user ID',
    example: '1234567890',
  })
  googleId: string;

  @IsEmail()
  @ApiProperty({
    description: 'User email address from Google',
    example: 'user@example.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'User first name from Google profile',
    example: 'John',
  })
  firstName: string;

  @IsString()
  @ApiProperty({
    description: 'User last name from Google profile',
    example: 'Doe',
  })
  lastName: string;

  @IsString()
  @ApiProperty({
    description: 'User profile picture URL from Google',
    example: 'https://lh3.googleusercontent.com/a/default-user',
  })
  picture: string;

  @IsString()
  @ApiProperty({
    description: 'Google OAuth access token',
    example: 'ya29.a0AfH6SMBx...',
  })
  accessToken: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Google OAuth refresh token (optional)',
    example: '1//0gHZBz...',
  })
  refreshToken?: string;
}
