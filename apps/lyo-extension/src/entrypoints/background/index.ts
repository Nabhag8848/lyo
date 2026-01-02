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
});
