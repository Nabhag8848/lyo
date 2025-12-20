import {
  Controller,
  Get,
  Param,
  Res,
  UseGuards,
  Logger,
  OnModuleDestroy,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { JwtAuthGuard } from '@/modules/api/auth/guards';
import { CurrentUser } from '@/modules/api/user/decorators';
import { AuthUserDto } from '@/modules/api/user/dtos';
import { RedisService } from '@/database/redis/redis.service';

@ApiTags('tryon')
@Controller('tryon')
@UseGuards(JwtAuthGuard)
export class TryonSseController implements OnModuleDestroy {
  private readonly logger = new Logger(TryonSseController.name);

  constructor(private readonly redisService: RedisService) {}

  @Get('events/:jobId')
  @ApiOperation({
    summary: 'SSE endpoint for try-on job events',
    description:
      'Server-Sent Events stream for receiving real-time updates about try-on job status and results',
  })
  @ApiResponse({
    status: 200,
    description: 'SSE connection established',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  async streamTryonEvents(
    @Param('jobId') jobId: string,
    @CurrentUser() { id: userId }: AuthUserDto,
    @Res() res: Response
  ): Promise<void> {
    // Set SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no'); // Disable nginx buffering

    // Send initial connection message
    res.write(`event: connected\n`);
    res.write(`data: ${JSON.stringify({ jobId, userId })}\n\n`);

    const channel = `tryon:${jobId}`;
    let isConnected = true;

    // Subscribe to Redis channel
    await this.redisService.subscribe(channel, (message: string) => {
      if (!isConnected) return;

      try {
        const data = JSON.parse(message);
        res.write(`event: ${data.event || 'update'}\n`);
        res.write(`data: ${JSON.stringify(data)}\n\n`);
      } catch (error) {
        this.logger.error(
          `Error parsing message from channel ${channel}:`,
          error
        );
        res.write(`event: error\n`);
        res.write(
          `data: ${JSON.stringify({ error: 'Failed to parse message' })}\n\n`
        );
      }
    });

    // Handle client disconnect
    res.on('close', async () => {
      isConnected = false;
      await this.redisService.unsubscribe(channel);
      this.logger.log(`SSE connection closed for job ${jobId}`);
    });

    // Keep connection alive with heartbeat
    const heartbeat = setInterval(() => {
      if (!isConnected) {
        clearInterval(heartbeat);
        return;
      }
      res.write(`: heartbeat\n\n`);
    }, 30000); // Send heartbeat every 30 seconds

    // Cleanup on disconnect
    res.on('close', () => {
      clearInterval(heartbeat);
    });
  }

  async onModuleDestroy() {
    // Cleanup is handled in res.on('close')
  }
}
