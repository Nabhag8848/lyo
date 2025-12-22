import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FashnaiWebhookRequestDto } from './dtos';
import { FashnaiWebhookService } from './fashnai-wh.service';
import { FashnaiWebhookSecretGuard } from './guards';
import { CurrentUserId } from './decorators';

@ApiTags('webhook')
@Controller('webhook/fashnai')
@UseGuards(FashnaiWebhookSecretGuard)
export class FashnaiWebhookController {
  constructor(private readonly fashnaiWebhookService: FashnaiWebhookService) {}

  @Post('gen')
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
  @ApiQuery({
    name: 'user_id',
    required: true,
    type: String,
    description: 'User ID for the try-on job',
    example: '123e4567-e89b-12d3-a456-426614174000',
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
  async handleFashnaiWebhook(
    @Body() body: FashnaiWebhookRequestDto,
    @CurrentUserId() userId: string
  ) {
    return this.fashnaiWebhookService.handleFashnaiWebhook(body, userId);
  }
}
