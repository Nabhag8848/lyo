import { apiClient } from '@/api/util';
import { activeTabProduct } from '@/storage';
import { AxiosResponse } from 'axios';
import { usePendingWardrobeItemStore } from '../stores/pending-wardrobe-items';
import { WardrobeItemStatus } from '@/constants';

export class GenerationService {
  async startGeneration(): Promise<boolean> {
    const activeTabProductMetadata = await activeTabProduct.getValue();

    if (!activeTabProductMetadata) {
      return false;
    }

    const pendingWardrobeItemStore = usePendingWardrobeItemStore.getState();

    const {
      brand: garmentBrandName,
      name: garmentName,
      description: garmentDescription,
      sourceUrl: garmentSourceUrl,
      imageUrl: garmentImageUrl,
    } = activeTabProductMetadata;

    const brandName = 'Myntra';
    const optimisticId = crypto.randomUUID();

    pendingWardrobeItemStore.prependItem({
      optimisticId,
      status: WardrobeItemStatus.PENDING,
      garment: {
        brandName,
        garmentBrandName,
        garmentDescription,
        garmentName,
        garmentUrl: garmentImageUrl,
        sourceUrl: garmentSourceUrl,
        id: crypto.randomUUID(),
      },
    });

    try {
      const response = await apiClient.post<
        GenerateTryonResponse,
        AxiosResponse<GenerateTryonResponse>,
        GenerateTryonRequestBody
      >('/tryon/gen', {
        brandName,
        optimisticId,
        garmentImageUrl,
        garmentSourceUrl,
        garmentBrandName,
        garmentName,
        garmentDescription,
      });

      const data = response.data;

      pendingWardrobeItemStore.updateItemByOptimisticId(optimisticId, {
        id: data.id,
      });
      return true;
    } catch (error) {
      pendingWardrobeItemStore.removeItemByOptimisticId(optimisticId);
      console.error(error);
      return false;
    }
  }
}
