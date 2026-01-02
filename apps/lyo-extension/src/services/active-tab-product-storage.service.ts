import { ActiveTabProductButton } from '@/constants/active-tab-product';
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

  async updateActiveTabProductButtonType(
    buttonType: ActiveTabProductButton
  ): Promise<void> {
    const product = await this.getActiveTabProduct();
    if (product) {
      await this.setActiveTabProduct({ ...product, buttonType });
    }
  }
}
