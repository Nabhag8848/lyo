import { TabEventManager } from './services';

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(async () => {
    await browser.sidePanel.setOptions({
      path: 'sidepanel.html',
      enabled: true,
    });

    await browser.sidePanel.setPanelBehavior({
      openPanelOnActionClick: true,
    });
  });

  const tabEventManager = new TabEventManager();
  tabEventManager.start();

  // when tab is activated, removed, updated, replaced set the active tab product
  // this should update the UI accordingly
  // sidepanel should be able to access this state and update the state

  // background -> storage -> store
  // sidepanel -> store -> storage
});
