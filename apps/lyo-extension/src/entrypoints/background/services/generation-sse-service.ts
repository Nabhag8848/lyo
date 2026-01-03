import { api } from '@/api/util';
import { usePendingWardrobeItemStore } from '../stores';
import { WardrobeItemStatus } from '@/constants';

export class GenerationSSEService {
  private eventSource: EventSource | null = null;

  async connect() {
    if (this.isConnectionOpen() || this.isConnectionClosed()) {
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

  private handleGenerationComplete = (event: MessageEvent<string>) => {
    const wardrobeItem: WardrobeItemResponse = JSON.parse(event.data);
    const pendingWardrobeItemsStore = usePendingWardrobeItemStore.getState();
    const { updateItem } = pendingWardrobeItemsStore;
    updateItem(wardrobeItem.id, {
      ...wardrobeItem,
      status: WardrobeItemStatus.COMPLETED,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private handleCloseConnection = (_event: MessageEvent) => {
    this.eventSource?.close();
    this.eventSource = null;
  };

  private handleError = (event: Event) => {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    console.error('[Generation SSE] Error:', event);
  };

  private handleOpen = (event: Event) => {
    console.log('[Generation SSE] Connection opened', event);
  };

  private isConnectionOpen() {
    return this.eventSource && this.eventSource.readyState === EventSource.OPEN;
  }

  private isConnectionClosed() {
    return this.eventSource && this.eventSource.readyState === EventSource.CLOSED;
  }
}
