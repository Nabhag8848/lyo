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
import { JwtAuthGuard } from '@/modules/api/auth/guards';
import { CurrentUser } from '@/modules/api/user/decorators';
import { AuthUserDto } from '@/modules/api/user/dtos';
import {ReferencePhotoDto} from './dtos/reference-photo.dto';
import { Serialize } from '@/app/decorators/serialize.decorator';
import { ImageFilePipe } from './validator';

@ApiTags('reference-photo')
@Controller('reference-photo')
@UseGuards(JwtAuthGuard)
export class ReferencePhotoController {
  constructor(private referencePhotoService: ReferencePhotoService) {}

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
    description: 'Invalid file - File too large or wrong format',
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

  @Get()
  @Serialize(ReferencePhotoDto)
  @ApiOperation({
    summary: 'Get user reference photo',
    description: "Retrieves the authenticated user's reference photo information",
  })
  @ApiResponse({
    status: 200,
    description: 'Reference photo retrieved successfully',
    type: ReferencePhotoDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  async getReferencePhoto(@CurrentUser() authUser: AuthUserDto): Promise<ReferencePhotoDto> {
    return this.referencePhotoService.getReferencePhoto(authUser.id);
  }

  @Delete()
  @ApiOperation({
    summary: 'Delete user reference photo',
    description: "Deletes the authenticated user's reference photo",
  })
  @ApiResponse({
    status: 200,
    description: 'Reference photo deleted successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  async deleteReferencePhoto(@CurrentUser() authUser: AuthUserDto): Promise<void> {
    return this.referencePhotoService.deleteReferencePhoto(authUser.id);
  }
}
