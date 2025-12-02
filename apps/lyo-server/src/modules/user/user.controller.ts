import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '@/modules/auth/guards';
import { AuthUserDto, UserProfileDto } from './dtos';
import { CurrentUser } from './decorators';
import { Serialize } from '@/app/decorators/serialize.decorator';

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
