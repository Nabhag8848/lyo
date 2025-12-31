import { Injectable } from '@nestjs/common';
import { GenerateTryonDto, GenerateTryonResponseDto } from './dtos';
import { FashnaiService } from '@/modules/fashnai/fashnai.service';
import { ReferencePhotoService } from '@/modules/api/reference-photo/reference-photo.service';
import { AvatarService } from '@/modules/api/avatar/avatar.service';
import { GarmentService } from '@/modules/garment/garment.service';
import { GenerationService } from '@/modules/generation/generation.service';

@Injectable()
export class TryonService {
  constructor(
    private readonly fashnaiService: FashnaiService,
    private readonly referencePhotoService: ReferencePhotoService,
    private readonly avatarService: AvatarService,
    private readonly garmentService: GarmentService,
    private readonly generationService: GenerationService
  ) {}

  async generateTryon(
    userId: string,
    {
      garmentImageUrl,
      garmentSourceUrl,
      garmentBrandName,
      garmentName,
      garmentDescription,
      brandName,
    }: GenerateTryonDto
  ): Promise<GenerateTryonResponseDto> {
    // temporary later we will get selected avatar image url
    const { url } = await this.referencePhotoService.getActiveReferencePhoto(
      userId
    );

    const { id: jobId } = await this.fashnaiService.startTryon({
      modelImageUrl: url as string,
      garmentImageUrl,
      userId,
    });

    const avatarId = await this.avatarService.getCurrentAvatarId(userId);
    const garment = await this.garmentService.createGarment(
      userId,
      garmentImageUrl,
      garmentSourceUrl,
      garmentBrandName,
      garmentName,
      garmentDescription,
      brandName
    );
    await this.generationService.createGeneration(
      userId,
      garment.id,
      avatarId,
      jobId
    );

    const generationId = await this.generationService.getGenerationIdByJobId(
      jobId
    );

    return { id: generationId };
  }
}
