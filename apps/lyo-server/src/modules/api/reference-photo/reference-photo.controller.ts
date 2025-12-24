import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Get,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReferencePhotoService } from './reference-photo.service';
import { JwtAuthGuard } from '@/modules/auth/guards';
import { CurrentUser } from '@/modules/auth/decorators';
import { AuthUserDto } from '@/modules/api/user/dtos';
import { ReferencePhotoDto } from './dtos/reference-photo.dto';
import { Serialize } from '@/app/decorators/serialize.decorator';
import { ImageFilePipe } from './validator';

@ApiTags('reference-photo')
@Controller('reference-photo')
@UseGuards(JwtAuthGuard)
export class ReferencePhotoController {
  constructor(private readonly referencePhotoService: ReferencePhotoService) {}

  @Post('upload')
  @HttpCode(HttpStatus.CREATED)
  @Serialize(ReferencePhotoDto)
  @UseInterceptors(FileInterceptor('reference-photo'))
  @ApiOperation({
    summary: 'Upload reference photo image',
    description:
      'Uploads a new reference photo image for the authenticated user. Maximum file size: 10MB',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        'reference-photo': {
          type: 'string',
          format: 'binary',
          description: 'Reference photo image file (JPEG, PNG, etc.)',
        },
      },
      required: ['reference-photo'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Reference photo uploaded successfully',
    type: ReferencePhotoDto,
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad request - File too large (>10MB), or invalid file type (must be an image)',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  async uploadReferencePhoto(
    @UploadedFile(ImageFilePipe)
    file: MulterFile,
    @CurrentUser() authUser: AuthUserDto
  ): Promise<ReferencePhotoDto> {
    return this.referencePhotoService.uploadReferencePhoto(file, authUser.id);
  }

  @Get('active')
  @Serialize(ReferencePhotoDto)
  @ApiOperation({
    summary: 'Get current active reference photo',
    description:
      "Retrieves the authenticated user's current active reference photo information",
  })
  @ApiResponse({
    status: 200,
    description: 'Current active reference photo retrieved successfully',
    type: ReferencePhotoDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiResponse({
    status: 404,
    description: 'No active reference photo found',
  })
  async getActiveReferencePhoto(
    @CurrentUser() authUser: AuthUserDto
  ): Promise<ReferencePhotoDto> {
    return this.referencePhotoService.getActiveReferencePhoto(authUser.id);
  }

  @Delete('active')
  @ApiOperation({
    summary: 'Delete current active reference photo',
    description:
      "Deletes the authenticated user's current active reference photo",
  })
  @ApiResponse({
    status: 200,
    description: 'Current active reference photo deleted successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiResponse({
    status: 404,
    description: 'No active reference photo found',
  })
  async deleteActiveReferencePhoto(
    @CurrentUser() authUser: AuthUserDto
  ): Promise<void> {
    return this.referencePhotoService.deleteActiveReferencePhoto(authUser.id);
  }
}
