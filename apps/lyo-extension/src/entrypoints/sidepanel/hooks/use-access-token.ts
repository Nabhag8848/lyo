import { useSyncExternalStore } from 'react';
import { getAccessToken } from '@/lib/api';

let cachedToken: string | null = null;
const listeners = new Set<() => void>();

const notifyListeners = () => {
  listeners.forEach((listener) => listener());
};

// Fetch token on first subscription
const fetchToken = async () => {
  const token = await getAccessToken();
  if (token !== cachedToken) {
    cachedToken = token;
    notifyListeners();
  }
};

export const useAccessToken = () => {
  return useSyncExternalStore(
    (onChange) => {
      listeners.add(onChange);

      // Fetch token when first listener subscribes
      if (listeners.size === 1) {
        fetchToken();
      }

      return () => {
        listeners.delete(onChange);
      };
    },
    () => cachedToken
  );
};

