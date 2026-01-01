import { useSyncExternalStore } from 'react';
import { getAccessToken } from '@/api/get-access-token';

let cachedAccessToken: string | null = null;
const listeners = new Set<() => void>();

const notifyListeners = () => {
  listeners.forEach((listener) => listener());
};

export const useAccessToken = () => {
  return useSyncExternalStore(
    (onChange) => {
      listeners.add(onChange);
      if (listeners.size === 1) {
        (async () => {
          const accessToken = await getAccessToken();

          if (cachedAccessToken !== accessToken) {
            cachedAccessToken = accessToken;
            notifyListeners();
          }
        })();
      }
      return () => {
        listeners.delete(onChange);
      };
    },
    () => cachedAccessToken
  );
};
