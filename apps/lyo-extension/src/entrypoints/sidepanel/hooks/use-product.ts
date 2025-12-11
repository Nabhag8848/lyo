import { Product } from '@/lib/messaging';
import { currentProductView } from '@/lib/storage';
import { useSyncExternalStore } from 'react';

let cachedProduct: Product | null = null;
const listeners = new Set<() => void>();

const notifyListeners = () => {
  listeners.forEach((listener) => listener());
};

export const useProduct = () => {
  return useSyncExternalStore(
    (onChange) => {
      listeners.add(onChange);
      if (listeners.size === 1) {
        currentProductView.getValue().then((product) => {
          cachedProduct = product;
          notifyListeners();
        });
      }

      const unwatch = currentProductView.watch((newProduct) => {
        cachedProduct = newProduct;
        notifyListeners();
      });

      return () => {
        listeners.delete(onChange);
        unwatch();
      };
    },
    () => {
      return cachedProduct;
    }
  );
};
