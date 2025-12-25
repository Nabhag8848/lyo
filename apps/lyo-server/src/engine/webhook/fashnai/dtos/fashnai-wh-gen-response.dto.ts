import { Expose } from 'class-transformer';
import { IsString, IsUrl, IsUUID, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FashnaiGenerationCompletedResponseDto {
  @Expose()
  @IsOptional()
  @IsString()
  @IsUUID()
  @ApiPropertyOptional({
    description: 'Unique identifier for image metadata in database',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @IsUrl()
  @ApiPropertyOptional({
    description: 'URL of the generated try-on image',
    example: 'https://example.com/generated-image.jpg',
  })
  imageUrl?: string;
}
