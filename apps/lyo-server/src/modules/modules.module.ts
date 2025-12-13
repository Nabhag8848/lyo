import { Module } from '@nestjs/common';
import { StorageModule } from './storage/storage.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [StorageModule, ApiModule],
})
export class ModulesModule {}
