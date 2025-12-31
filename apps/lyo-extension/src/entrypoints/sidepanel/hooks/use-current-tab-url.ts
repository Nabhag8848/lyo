import { useSyncExternalStore } from 'react';

let cachedTabUrl: string | null = null;
const listeners = new Set<() => void>();

const notifyListeners = () => {
  listeners.forEach((listener) => listener());
};

const fetchCurrentTabUrl = async () => {
  try {
    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (tab?.url) {
      cachedTabUrl = tab.url;
      notifyListeners();
    }
  } catch (error) {
    console.error('Failed to get current tab URL:', error);
  }
};

// Listen for tab updates to keep URL in sync
const handleTabUpdate = (
  tabId: number,
  changeInfo: Browser.tabs.OnUpdatedInfo
) => {
  if (changeInfo.url) {
    browser.tabs.get(tabId).then((tab) => {
      if (tab?.active && tab?.url) {
        cachedTabUrl = tab.url;
        notifyListeners();
      }
    });
  }
};

export const useCurrentTabUrl = () => {
  return useSyncExternalStore(
    (onChange) => {
      listeners.add(onChange);

      // Initialize on first subscription
      if (listeners.size === 1) {
        fetchCurrentTabUrl();
        browser.tabs.onUpdated.addListener(handleTabUpdate);
      }

      return () => {
        listeners.delete(onChange);
        // Clean up listener when no more subscribers
        if (listeners.size === 0) {
          browser.tabs.onUpdated.removeListener(handleTabUpdate);
        }
      };
    },
    () => {
      return cachedTabUrl;
    }
  );
};
