import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { FashnaiWebhookRequestDto } from './dtos';
import { FashnaiWebhookService } from './fashnai-wh.service';
import { FashnaiWebhookSecretGuard } from './guards';

@Controller('webhook/fashnai')
@UseGuards(FashnaiWebhookSecretGuard)
export class FashnaiWebhookController {
  constructor(private readonly fashnaiWebhookService: FashnaiWebhookService) {}
  @Post()
  async handleFashnaiWebhook(@Body() body: FashnaiWebhookRequestDto) {
    return this.fashnaiWebhookService.handleFashnaiWebhook(body);
  }
}
