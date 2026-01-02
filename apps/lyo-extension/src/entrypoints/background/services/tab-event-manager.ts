import { ActiveTabProductStorageService } from '@/services';

export class TabEventManager {
  private activeTabProductStorageService: ActiveTabProductStorageService;

  constructor() {
    this.activeTabProductStorageService = new ActiveTabProductStorageService();
  }

  start(): void {
    browser.tabs.onActivated.addListener(this.handleTabActivated.bind(this));
    browser.tabs.onUpdated.addListener(this.handleTabUpdated.bind(this));
  }

  stop(): void {
    browser.tabs.onActivated.removeListener(this.handleTabActivated.bind(this));
    browser.tabs.onUpdated.removeListener(this.handleTabUpdated.bind(this));
  }
  // extract product value and store it if present
  private async handleTabActivated(
    activeInfo: Browser.tabs.OnActivatedInfo
  ): Promise<void> {
    const { tabId } = activeInfo;
    const { url } = await browser.tabs.get(tabId);

    const isMyntraBaseUrl =
      url && url.includes('myntra.com') && url.includes('/buy');

    if (isMyntraBaseUrl) {
      const activeTabProductMeta = await browser.tabs.sendMessage<
        { type: 'get_active_tab_product_meta' },
        ActiveTabProductState
      >(tabId, {
        type: 'get_active_tab_product_meta',
      });

      await this.activeTabProductStorageService.setActiveTabProduct(
        activeTabProductMeta
      );
    } else {
      await this.activeTabProductStorageService.clearActiveTabProduct();
    }
    return;
  }

  private async handleTabUpdated(
    tabId: number,
    changeInfo: Browser.tabs.OnUpdatedInfo,
    tab: Browser.tabs.Tab
  ): Promise<void> {
    const { url } = tab;
    if (!url) return;

    const isMyntraBaseUrl =
      url && url.includes('myntra.com') && url.includes('/buy');

    if (isMyntraBaseUrl) {
      const activeTabProductMeta = await browser.tabs.sendMessage<
        { type: 'get_active_tab_product_meta' },
        ActiveTabProductState
      >(tabId, {
        type: 'get_active_tab_product_meta',
      });

      await this.activeTabProductStorageService.setActiveTabProduct(
        activeTabProductMeta
      );
    } else {
      await this.activeTabProductStorageService.clearActiveTabProduct();
    }
    return;
  }
}
