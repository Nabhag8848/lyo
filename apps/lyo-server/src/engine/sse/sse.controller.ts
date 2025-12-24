import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/modules/auth/guards';

@Controller('sse')
@UseGuards(JwtAuthGuard)
export class SseController {}
