import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthUserDto, UserProfileDto } from './dtos';
import { CurrentUser } from './decorators';
import { Serialize } from '@/app/decorators/serialize.decorator';
import { JwtAuthGuard } from '@/modules/api/auth/guards';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  @Serialize(UserProfileDto)
  async getProfile(
    @CurrentUser() authUser: AuthUserDto
  ): Promise<UserProfileDto> {
    const user = await this.userService.findByIdOrFail(authUser.id);

    return user;
  }
}
