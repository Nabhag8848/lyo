import { MessageHandler } from '@/entrypoints/background/handlers/message';

export class MessageHandlerRegistry {
  private handlers = new Map<string, MessageHandler<unknown, unknown>>();

  register<TData, TResponse>(handler: MessageHandler<TData, TResponse>): void {
    if (this.handlers.has(handler.messageType)) {
      throw new Error(
        `Handler for "${handler.messageType}" already registered`
      );
    }
    this.handlers.set(
      handler.messageType,
      handler as MessageHandler<unknown, unknown>
    );
  }

  async dispatch(
    message: { type: string; data: unknown },
    sender: Browser.runtime.MessageSender
  ): Promise<unknown> {
    const handler = this.handlers.get(message.type);

    if (!handler) {
      console.warn(`No handler registered for message type: ${message.type}`);
      return;
    }

    return handler.handle(message.data, sender);
  }

  has(messageType: string): boolean {
    return this.handlers.has(messageType);
  }
}
