import { useSyncExternalStore } from 'react';
import { api } from '@/api/util';
import { useSignInStore } from '@/entrypoints/sidepanel/stores';

export const useAccessToken = () => {
  return useSyncExternalStore(
    (onStoreChange) => {
      const { clientDomain } = api;
      const { hydrate, setAccessToken } = useSignInStore.getState();
      hydrate();

      const onChangeCallback = (
        changeInfo: Browser.cookies.CookieChangeInfo
      ) => {
        const { cookie, removed } = changeInfo;

        const isAccessTokenClientDomain =
          cookie?.domain === clientDomain && cookie?.name === 'access_token';

        if (isAccessTokenClientDomain) {
          if (removed) {
            setAccessToken(null);
          } else {
            setAccessToken(cookie.value);
          }
        }
      };

      browser.cookies.onChanged.addListener(onChangeCallback);

      // Subscribe to Zustand store to notify React of changes
      const unsubscribeStoreChanges = useSignInStore.subscribe(onStoreChange);

      return () => {
        browser.cookies.onChanged.removeListener(onChangeCallback);
        unsubscribeStoreChanges();
      };
    },
    () => {
      const { accessToken } = useSignInStore.getState();
      return accessToken;
    }
  );
};
