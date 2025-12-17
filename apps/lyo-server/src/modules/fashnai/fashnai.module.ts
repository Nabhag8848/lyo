import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FashnaiService } from './fashnai.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [FashnaiService],
  exports: [FashnaiService],
})
export class FashnaiModule {}
