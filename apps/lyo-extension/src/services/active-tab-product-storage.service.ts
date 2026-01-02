import { activeTabProduct } from '@/storage';

export class ActiveTabProductStorageService {
  async getActiveTabProduct(): Promise<ActiveTabProductState | null> {
    return activeTabProduct.getValue();
  }

  async setActiveTabProduct(product: ActiveTabProductState): Promise<void> {
    await activeTabProduct.setValue(product);
  }

  async clearActiveTabProduct(): Promise<void> {
    await activeTabProduct.setValue(null);
  }
}
