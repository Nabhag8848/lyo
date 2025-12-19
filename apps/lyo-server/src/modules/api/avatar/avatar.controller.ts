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
import { AvatarService } from './avatar.service';
import { JwtAuthGuard } from '@/modules/api/auth/guards';
import { CurrentUser } from '@/modules/api/user/decorators';
import { AuthUserDto } from '@/modules/api/user/dtos';
import { AvatarDto } from './dtos/avatar.dto';
import { Serialize } from '@/app/decorators/serialize.decorator';
import { ImageFilePipe } from './validator';

@ApiTags('avatar')
@Controller('avatar')
@UseGuards(JwtAuthGuard)
export class AvatarController {
  constructor(private avatarService: AvatarService) {}

  @Post('upload')
  @HttpCode(HttpStatus.CREATED)
  @Serialize(AvatarDto)
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiOperation({
    summary: 'Upload avatar image',
    description:
      'Uploads a new avatar image for the authenticated user. Maximum file size: 10MB',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
          description: 'Avatar image file (JPEG, PNG, etc.)',
        },
      },
      required: ['avatar'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Avatar uploaded successfully',
    type: AvatarDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid file - File too large or wrong format',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  async uploadAvatar(
    @UploadedFile(ImageFilePipe)
    file: MulterFile,
    @CurrentUser() authUser: AuthUserDto
  ): Promise<AvatarDto> {
    return this.avatarService.uploadAvatar(file, authUser.id);
  }

  @Get()
  @Serialize(AvatarDto)
  @ApiOperation({
    summary: 'Get user avatar',
    description: "Retrieves the authenticated user's avatar information",
  })
  @ApiResponse({
    status: 200,
    description: 'Avatar retrieved successfully',
    type: AvatarDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  async getAvatar(@CurrentUser() authUser: AuthUserDto): Promise<AvatarDto> {
    return this.avatarService.getAvatar(authUser.id);
  }

  @Delete()
  @ApiOperation({
    summary: 'Delete user avatar',
    description: "Deletes the authenticated user's avatar",
  })
  @ApiResponse({
    status: 200,
    description: 'Avatar deleted successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  async deleteAvatar(@CurrentUser() authUser: AuthUserDto): Promise<void> {
    return this.avatarService.deleteAvatar(authUser.id);
  }
}
