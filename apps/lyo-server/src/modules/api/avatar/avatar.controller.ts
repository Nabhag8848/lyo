import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Get,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AvatarService } from './avatar.service';
import { JwtAuthGuard } from '@/modules/api/auth/guards';
import { CurrentUser } from '@/modules/api/user/decorators';
import { AuthUserDto } from '@/modules/api/user/dtos';
import { AvatarDto } from './dtos/avatar.dto';
import { Serialize } from '@/app/decorators/serialize.decorator';

@Controller('avatar')
@UseGuards(JwtAuthGuard)
export class AvatarController {
  constructor(private avatarService: AvatarService) {}

  @Post('upload')
  @Serialize(AvatarDto)
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() authUser: AuthUserDto
  ): Promise<AvatarDto> {
    return this.avatarService.uploadAvatar(file, authUser.id);
  }

  @Get()
  @Serialize(AvatarDto)
  async getAvatar(@CurrentUser() authUser: AuthUserDto): Promise<AvatarDto> {
    return this.avatarService.getAvatar(authUser.id);
  }

  @Delete()
  async deleteAvatar(@CurrentUser() authUser: AuthUserDto): Promise<void> {
    return this.avatarService.deleteAvatar(authUser.id);
  }
}
