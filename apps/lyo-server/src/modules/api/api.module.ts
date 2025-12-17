import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AvatarModule } from './avatar/avatar.module';
import { TryonModule } from './tryon/tryon.module';

@Module({
  imports: [UserModule, AuthModule, AvatarModule, TryonModule],
})
export class ApiModule {}
