import { ApiProperty } from '@nestjs/swagger';
import { IsUrl, IsUUID } from 'class-validator';

export class GetGenerationImageUrlResponseDto {
  @IsUUID()
  @ApiProperty({
    description: 'Unique identifier for the try-on generation job',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @IsUrl()
  @ApiProperty({
    description: 'URL of the generated try-on image',
    example: 'https://example.com/generated-image.jpg',
  })
  imageUrl: string;
}
