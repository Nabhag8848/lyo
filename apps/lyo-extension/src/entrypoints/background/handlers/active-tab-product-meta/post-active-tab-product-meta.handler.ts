import { ActiveTabProductStorageService } from '@/services/active-tab-product-storage.service';
import { MessageHandler } from '@/entrypoints/background/handlers/message';

export class PostActiveTabProductMetaHandler
  implements MessageHandler<ActiveTabProductState>
{
  readonly messageType = 'post_active_tab_product_meta';

  constructor(
    private readonly storageService: ActiveTabProductStorageService
  ) {}

  async handle(data: ActiveTabProductState): Promise<void> {
    await this.storageService.setActiveTabProduct(data);
  }
}
