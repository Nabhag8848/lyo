import { ActiveTabProductButton } from '@/constants/active-tab-product';
import { ActiveTabProductStorageService } from '@/services/active-tab-product-storage.service';
import { MessageHandler } from '@/entrypoints/background/handlers/message';

export class UpdateActiveTabProductButtonTypeHandler
  implements MessageHandler<ActiveTabProductButton>
{
  readonly messageType = 'update_active_tab_product_button_type';

  constructor(
    private readonly storageService: ActiveTabProductStorageService
  ) {}

  async handle(data: ActiveTabProductButton): Promise<void> {
    await this.storageService.updateActiveTabProductButtonType(data);
  }
}
