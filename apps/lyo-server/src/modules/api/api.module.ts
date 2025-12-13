import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AvatarModule } from './avatar/avatar.module';

@Module({
  imports: [UserModule, AuthModule, AvatarModule],
})
export class ApiModule {}
