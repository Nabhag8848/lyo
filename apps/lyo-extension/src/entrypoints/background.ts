import { onMessage } from "@/lib/messaging";

export default defineBackground(() => {
  browser.tabs.onActivated.addListener(async ({ tabId }) => {
    if (tabId) {
      const tab = await browser.tabs.get(tabId);
      const { url } = tab;

      if (!url?.includes("myntra.com")) {
        await browser.sidePanel.setOptions({
          tabId,
          enabled: false,
        });
      }
    }
  });

  browser.tabs.onUpdated.addListener(async (tabId, _changeInfo, tab) => {
    if (tabId) {
      const { url } = tab;
      if (url?.includes("myntra.com")) {
        await browser.sidePanel.setOptions({
          path: "sidepanel.html",
          tabId,
          enabled: true,
        });

        await browser.sidePanel.setPanelBehavior({
          openPanelOnActionClick: true,
        });
      } else {
        await browser.sidePanel.setOptions({
          tabId,
          enabled: false,
        });
      }
    }
  });

  onMessage("openSidePanel", async ({ sender }) => {
    await browser.sidePanel.open({
      tabId: sender.tab?.id,
    });
  });
});
