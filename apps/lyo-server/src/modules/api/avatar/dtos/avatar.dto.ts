import { Expose } from 'class-transformer';
import { IsOptional, IsString, IsUrl, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AvatarDto {
  @Expose()
  @IsString()
  @IsUUID()
  @ApiProperty({
    description: 'Unique identifier for the avatar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Expose()
  @IsString()
  @IsUrl()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'URL of the avatar image',
    example: 'https://example.com/avatar.jpg',
  })
  url?: string;
}
