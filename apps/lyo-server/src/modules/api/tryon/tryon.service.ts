import { Injectable } from '@nestjs/common';
import { GenerateTryonDto, GenerateTryonResponseDto } from './dtos';
import { FashnaiService } from '@/modules/fashnai/fashnai.service';
import { S3ObjectService } from '@/modules/storage/s3/services/s3-object.service';

@Injectable()
export class TryonService {
  constructor(
    private readonly fashnaiService: FashnaiService,
    private readonly s3ObjectService: S3ObjectService
  ) {}

  async generateTryon(
    userId: string,
    { garmentImageUrl }: GenerateTryonDto
  ): Promise<GenerateTryonResponseDto> {
    const modelImageUrl = await this.s3ObjectService.get(
      `users/${userId}/avatar/uploaded_avatar`,
      {
        urlExpiresIn: 5 * 60, // 5 minutes
      }
    );

    const { id } = await this.fashnaiService.startTryon({
      modelImageUrl,
      garmentImageUrl,
    });

    return { id };
  }
}
