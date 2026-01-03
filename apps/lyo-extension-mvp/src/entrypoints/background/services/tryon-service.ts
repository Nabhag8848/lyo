import { api } from '@/api/util';
import { pendingGenerationsStorage } from '@/lib/storage';
import { sseService } from './sse-service';

export type StartTryonRequest = {
  garmentImageUrl: string;
  garmentSourceUrl: string;
  brandName?: string;
  garmentBrandName?: string;
  garmentName?: string;
  garmentDescription?: string;
};

export type StartTryonResponse = {
  id: string;
};

class TryonService {
  /**
   * Start a try-on generation
   * @returns The generation ID from the server
   */
  async startTryon(
    request: StartTryonRequest,
    productInfo: ProductInfo
  ): Promise<string> {
    const serverUrl = api.serverUrl;

    const response = await fetch(`${serverUrl}/tryon/gen`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to start try-on: ${response.status}`);
    }

    const data = (await response.json()) as StartTryonResponse;
    const generationId = data.id;

    // Add to pending generations storage
    const generations = (await pendingGenerationsStorage.getValue()) ?? [];
    const newGeneration: PendingGeneration = {
      id: generationId,
      status: 'pending',
      productImageUrl: productInfo.imageUrl,
      productInfo,
      createdAt: Date.now(),
    };

    await pendingGenerationsStorage.setValue([...generations, newGeneration]);

    // Ensure SSE connection is active
    await sseService.connect();

    return generationId;
  }
}

// Singleton instance
export const tryonService = new TryonService();
