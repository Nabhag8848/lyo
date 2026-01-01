import { useSyncExternalStore } from 'react';
import { api } from '@/api/util';
import { SignInStore } from '@/entrypoints/sidepanel/stores';

export const useAccessToken = () => {
  return useSyncExternalStore(
    (onStoreChange) => {
      const { clientDomain } = api;

      // Trigger hydration on first subscription
      SignInStore.getState().hydrate();

      const onChangeCallback = (
        changeInfo: Browser.cookies.CookieChangeInfo
      ) => {
        const { cookie, removed } = changeInfo;

        const isAccessTokenClientDomain =
          cookie?.domain === clientDomain && cookie?.name === 'access_token';

        if (isAccessTokenClientDomain) {
          if (removed) {
            SignInStore.getState().setAccessToken(null);
          } else {
            SignInStore.getState().setAccessToken(cookie.value);
          }
        }
      };

      browser.cookies.onChanged.addListener(onChangeCallback);

      // Subscribe to Zustand store to notify React of changes
      const unsubscribeStore = SignInStore.subscribe(onStoreChange);

      return () => {
        browser.cookies.onChanged.removeListener(onChangeCallback);
        unsubscribeStore();
      };
    },
    () => SignInStore.getState().accessToken
  );
};
