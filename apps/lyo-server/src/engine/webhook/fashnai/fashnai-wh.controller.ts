import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { FashnaiWebhookRequestDto } from './dtos';
import { FashnaiWebhookService } from './fashnai-wh.service';
import { FashnaiWebhookSecretGuard } from './guards';

@ApiTags('webhook')
@Controller('webhook/fashnai')
@SkipThrottle()
@UseGuards(FashnaiWebhookSecretGuard)
export class FashnaiWebhookController {
  constructor(private readonly fashnaiWebhookService: FashnaiWebhookService) {}

  @Post()
  @ApiOperation({
    summary: 'Fashnai webhook handler',
    description:
      'Receives webhook notifications from Fashnai service for try-on job completion or failure',
  })
  @ApiQuery({
    name: 'secret',
    required: true,
    type: String,
    description: 'Webhook secret for authentication',
    example: 'your-webhook-secret',
  })
  @ApiResponse({
    status: 200,
    description: 'Webhook processed successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid webhook secret',
  })
  async handleFashnaiWebhook(@Body() body: FashnaiWebhookRequestDto) {
    return this.fashnaiWebhookService.handleFashnaiWebhook(body);
  }
}
