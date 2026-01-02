import { ActiveTabProductStorageService } from '@/services';

export class TabEventManager {
  private activeTabProductStorageService: ActiveTabProductStorageService;

  constructor() {
    this.activeTabProductStorageService = new ActiveTabProductStorageService();
  }

  start(): void {
    browser.tabs.onActivated.addListener(this.handleTabActivated.bind(this));
    browser.tabs.onUpdated.addListener(this.handleTabUpdated.bind(this));
    browser.tabs.onRemoved.addListener(this.handleTabRemoved.bind(this));
    browser.tabs.onReplaced.addListener(this.handleTabReplaced.bind(this));
    browser.tabs.onCreated.addListener(this.handleTabCreated.bind(this));
  }

  stop(): void {
    browser.tabs.onActivated.removeListener(this.handleTabActivated.bind(this));
    browser.tabs.onUpdated.removeListener(this.handleTabUpdated.bind(this));
    browser.tabs.onRemoved.removeListener(this.handleTabRemoved.bind(this));
    browser.tabs.onReplaced.removeListener(this.handleTabReplaced.bind(this));
    browser.tabs.onCreated.removeListener(this.handleTabCreated.bind(this));
  }
  // extract product value and store it if present
  private async handleTabActivated(
    activeInfo: Browser.tabs.OnActivatedInfo
  ): Promise<void> {
    const { tabId } = activeInfo;
    const { url } = await browser.tabs.get(tabId);

    if (url) {
      await this.activeTabProductStorageService.setActiveTabProduct({
        brand: 'nambiar',
        name: 'nambiar',
        price: Math.random().toString(),
        mrp: '100',
        discount: '10',
        discountPercent: '10%',
        description: null,
        imageUrl: 'https://via.placeholder.com/150',
        sourceUrl: url,
        buttonType: null,
        sizeOptions: [
          { size: 'M', available: true },
          { size: 'L', available: true },
          { size: 'XL', available: true },
        ],
        selectedSize: 'M',
      });
      // extract product value and store it if present
    }

    return;
  }

  private async handleTabUpdated(
    tabId: number,
    changeInfo: Browser.tabs.OnUpdatedInfo,
    tab: Browser.tabs.Tab
  ): Promise<void> {
    return;
  }

  private async handleTabRemoved(
    tabId: number,
    removeInfo: Browser.tabs.OnRemovedInfo
  ): Promise<void> {
    return;
  }

  private async handleTabReplaced(
    addedTabId: number,
    removedTabId: number
  ): Promise<void> {
    return;
  }

  private async handleTabCreated(tab: Browser.tabs.Tab): Promise<void> {
    return;
  }
}
