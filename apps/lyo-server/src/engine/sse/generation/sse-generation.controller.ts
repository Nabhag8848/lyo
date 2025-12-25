import { PubSubService } from '@/engine/pubsub/pubsub.service';
import { FashnaiGenerationCompletedResponseDto } from '@/engine/webhook/fashnai/dtos/fashnai-wh-gen-response.dto';
import { FashnaiGenerationCompleteSchema } from '@/engine/webhook/fashnai/schema';
import { AuthUserDto } from '@/modules/api/user/dtos';
import { CurrentUser } from '@/modules/auth/decorators';
import { JwtAuthGuard } from '@/modules/auth/guards';
import { GenerationService } from '@/modules/generation/generation.service';
import { Controller, Sse, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Observable,
  interval,
  merge,
  switchMap,
  filter,
  take,
  tap,
  map,
  delay,
} from 'rxjs';

@ApiTags('sse')
@Controller('sse')
@UseGuards(JwtAuthGuard)
export class SseGenerationController {
  constructor(
    private readonly pubSubService: PubSubService<
      typeof FashnaiGenerationCompleteSchema,
      FashnaiGenerationCompletedMessage
    >,
    private readonly generationService: GenerationService
  ) {}

  @Sse('generation')
  @ApiOperation({
    summary: 'Server-Sent Events stream for try-on generation updates',
    description:
      'Establishes a Server-Sent Events (SSE) connection to receive real-time updates about try-on generation jobs. The stream sends generation completion events and automatically closes when no pending generations remain.',
  })
  @ApiResponse({
    status: 200,
    description:
      'SSE stream established. Events: "generation" for generation updates with FashnaiGenerationCompletedResponseDto data, "close_connection" event when all generations are complete.',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          description:
            'Generation data (FashnaiGenerationCompletedResponseDto) or empty object for close_connection event',
          properties: {
            id: {
              type: 'string',
              example: '123e4567-e89b-12d3-a456-426614174000',
              description: 'Generation job ID',
            },
            imageUrl: {
              type: 'string',
              example: 'https://example.com/generated-image.jpg',
              description: 'URL of the generated try-on image',
            },
          },
        },
        type: {
          type: 'string',
          enum: ['generation', 'close_connection'],
          description:
            'Event type: "generation" for generation updates, "close_connection" to signal stream closure',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  generationSse(
    @CurrentUser() authUser: AuthUserDto
  ): Observable<MessageEventData<FashnaiGenerationCompletedResponseDto>> {
    const channel = `user:${authUser.id}:generation`;

    // Subscribe to the pubsub channel
    const pubsubStream = this.pubSubService.subscribe(channel);

    // Create a periodic check that completes when no pending generations
    const checkStream = interval(10000).pipe(
      switchMap(async () => {
        const hasPending = await this.generationService.hasPendingGenerations(
          authUser.id
        );
        return hasPending;
      }),
      filter((hasPending) => !hasPending), // Only emit when no pending
      take(1), // Take first emission (when no pending found)
      delay(2000),
      map<boolean, MessageEventData<FashnaiGenerationCompletedResponseDto>>(
        () => ({
          data: {},
          type: 'close_connection',
        })
      ),
      tap(() => {
        // No pending generations - complete subscription and unsubscribe
        this.pubSubService.unsubscribe(channel);
      })
    );

    // Merge streams - when checkStream completes, it triggers cleanup
    return merge(pubsubStream, checkStream);
  }
}
