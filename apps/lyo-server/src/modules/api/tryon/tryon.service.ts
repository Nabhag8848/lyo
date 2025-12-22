import { Injectable } from '@nestjs/common';
import { GenerateTryonDto, GenerateTryonResponseDto } from './dtos';
import { FashnaiService } from '@/modules/fashnai/fashnai.service';
import { ReferencePhotoService } from '@/modules/api/reference-photo/reference-photo.service';

@Injectable()
export class TryonService {
  constructor(
    private readonly fashnaiService: FashnaiService,
    private readonly referencePhotoService: ReferencePhotoService
  ) {}

  async generateTryon(
    userId: string,
    { garmentImageUrl }: GenerateTryonDto
  ): Promise<GenerateTryonResponseDto> {
    // temporary later we will get selected avatar image url
    const { url } = await this.referencePhotoService.getActiveReferencePhoto(
      userId
    );

    // const modelImageUrl = await this.s3ObjectService.get(
    //   `users/${userId}/reference-photo/uploaded_reference_photo`,
    //   {
    //     urlExpiresIn: 5 * 60, // 5 minutes
    //   }
    // );

    const { id } = await this.fashnaiService.startTryon({
      modelImageUrl: url as string,
      garmentImageUrl,
      userId,
    });

    return { id };
  }
}
