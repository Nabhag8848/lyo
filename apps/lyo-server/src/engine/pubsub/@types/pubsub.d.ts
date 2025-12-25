import { MessageEvent } from '@nestjs/common';

declare global {
  interface MessageEventData<T> extends MessageEvent {
    data: T | null;
    type: 'generation' | 'close_connection';
  }
}
