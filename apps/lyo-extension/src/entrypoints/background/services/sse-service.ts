import {
  pendingGenerationsStorage,
  sseConnectionStateStorage,
} from '@/lib/storage';
import { api } from '@/api/util';

type GenerationEvent = {
  id: string;
  imageUrl: string;
};

class SSEService {
  private eventSource: EventSource | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000; // Start with 1 second

  async connect(): Promise<void> {
    // Already connected
    if (
      this.eventSource &&
      this.eventSource.readyState !== EventSource.CLOSED
    ) {
      return;
    }

    try {
      const serverUrl = api.serverUrl;
      this.eventSource = new EventSource(`${serverUrl}/sse/generation`, {
        withCredentials: true,
      });

      this.eventSource.addEventListener('generation', async (event) => {
        const data = JSON.parse(event.data) as GenerationEvent;
        await this.handleGenerationComplete(data);
      });

      this.eventSource.addEventListener('close_connection', async () => {
        await this.handleCloseConnection();
      });

      this.eventSource.onopen = async () => {
        console.log('[SSE] Connection established');
        this.reconnectAttempts = 0;
        this.reconnectDelay = 1000;
        await sseConnectionStateStorage.setValue({ isConnected: true });
      };

      this.eventSource.onerror = async (error) => {
        console.error('[SSE] Connection error:', error);
        await this.handleError();
      };
    } catch (error) {
      console.error('[SSE] Failed to connect:', error);
      await this.handleError();
    }
  }

  private async handleGenerationComplete(data: GenerationEvent): Promise<void> {
    console.log('[SSE] Generation complete:', data.id);

    const generations = (await pendingGenerationsStorage.getValue()) ?? [];
    const updated = generations.map((g) =>
      g.id === data.id
        ? {
            ...g,
            status: 'completed' as const,
            generatedImageUrl: data.imageUrl,
          }
        : g
    );

    await pendingGenerationsStorage.setValue(updated);
  }

  private async handleCloseConnection(): Promise<void> {
    console.log('[SSE] Server requested connection close');

    this.eventSource?.close();
    this.eventSource = null;

    // DON'T clear generations here - they should remain visible in the UI
    // until the sidepanel is closed or the user navigates away.
    // The completed generations will show as generated images in the carousel.
    // They'll be deduplicated when wardrobe reloads with fresh data.

    await sseConnectionStateStorage.setValue({ isConnected: false });
  }

  private async handleError(): Promise<void> {
    // Close the current connection if any
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }

    await sseConnectionStateStorage.setValue({ isConnected: false });

    // Check if we should attempt reconnection
    const generations = (await pendingGenerationsStorage.getValue()) ?? [];
    const hasPending = generations.some((g) => g.status === 'pending');

    if (hasPending && this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay =
        this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

      console.log(
        `[SSE] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`
      );

      setTimeout(() => {
        this.connect();
      }, delay);
    } else if (!hasPending) {
      console.log('[SSE] No pending generations, not reconnecting');
    } else {
      console.error('[SSE] Max reconnection attempts reached');
    }
  }

  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    sseConnectionStateStorage.setValue({ isConnected: false });
  }

  isConnected(): boolean {
    return (
      this.eventSource !== null &&
      this.eventSource.readyState === EventSource.OPEN
    );
  }

  // Clear all generations - called when sidepanel closes
  async clearGenerations(): Promise<void> {
    await pendingGenerationsStorage.setValue([]);
  }
}

// Singleton instance
export const sseService = new SSEService();
