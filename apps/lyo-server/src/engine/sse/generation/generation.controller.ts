import { PubSubService } from '@/engine/pubsub/pubsub.service';
import { FashnaiGenerationCompletedResponseDto } from '@/engine/webhook/fashnai/dtos/fashnai-wh-gen-response.dto';
import { FashnaiGenerationCompleteSchema } from '@/engine/webhook/fashnai/schema';
import { AuthUserDto } from '@/modules/api/user/dtos';
import { CurrentUser } from '@/modules/auth/decorators';
import { JwtAuthGuard } from '@/modules/auth/guards';
import { Controller, Sse, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';

@Controller('sse')
@UseGuards(JwtAuthGuard)
export class GenerationController {
  constructor(
    private readonly pubSubService: PubSubService<
      typeof FashnaiGenerationCompleteSchema,
      FashnaiGenerationCompletedMessage
    >
  ) {}

  @Sse('generation')
  generationSse(
    @CurrentUser() authUser: AuthUserDto
  ): Observable<MessageEventData<FashnaiGenerationCompletedResponseDto>> {
    const channel = `user:${authUser.id}:generation`;
    return this.pubSubService.subscribe(channel);
  }
}
