import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [AuthModule, UserModule, StorageModule],
})
export class ModulesModule {}
