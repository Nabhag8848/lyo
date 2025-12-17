import { Module } from '@nestjs/common';
import { StorageModule } from './storage/storage.module';
import { ApiModule } from './api/api.module';
import { FashnaiModule } from './fashnai/fashnai.module';

@Module({
  imports: [StorageModule, ApiModule, FashnaiModule],
})
export class ModulesModule {}
