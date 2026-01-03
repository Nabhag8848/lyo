import { api } from '@/api/util';
import { pendingWardrobeItems } from '@/storage';

export class GenerationSSEService {
  private eventSource: EventSource | null = null;

  constructor() {}

  async connect() {
    if (this.eventSource) {
      return;
    }

    this.eventSource = new EventSource(`${api.serverUrl}/sse/generation`, {
      withCredentials: true,
    });

    this.eventSource.addEventListener(
      'generation',
      this.handleGenerationComplete
    );

    this.eventSource.addEventListener(
      'close_connection',
      this.handleCloseConnection
    );

    this.eventSource.addEventListener('error', this.handleError);

    this.eventSource.addEventListener('open', this.handleOpen);
  }

  private handleGenerationComplete(event: MessageEvent) {}

  private handleCloseConnection(_event: MessageEvent) {
    this.eventSource?.close();
    this.eventSource = null;
  }

  private handleError(event: Event) {}

  private handleOpen(event: Event) {}
}
