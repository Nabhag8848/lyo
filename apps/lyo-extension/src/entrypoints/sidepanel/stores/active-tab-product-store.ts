import { activeTabProduct } from '@/storage';
import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';

const initialState: ActiveTabProductState = {
  brand: null,
  name: null,
  price: null,
  mrp: null,
  discount: null,
  discountPercent: null,
  description: null,
  imageUrl: null,
  sourceUrl: null,
  buttonType: null,
  sizeOptions: null,
  selectedSize: null,
};

const activeTabProductStateStorage: StateStorage<void> = {
  getItem: async () => {
    const activeTabProductValue = await activeTabProduct.getValue();
    return JSON.stringify({ activeTabProductValue });
  },
  setItem: async (_: string, value: string) => {
    return activeTabProduct.setValue(JSON.parse(value)?.state);
  },
  removeItem: async () => {
    return activeTabProduct.setValue(null);
  },
};

export const useActiveTabProductStore = create<ActiveTabProductState>()(
  persist(() => initialState, {
    name: 'active_tab_product',
    storage: createJSONStorage(() => activeTabProductStateStorage),
  })
);

activeTabProduct.getValue().then((newValue) => {
  if (newValue) {
    useActiveTabProductStore.setState(newValue);
  }
});

activeTabProduct.watch((newValue) => {
  const currentState = useActiveTabProductStore.getState();

  if (JSON.stringify(currentState) != JSON.stringify(newValue)) {
    if (newValue) {
      useActiveTabProductStore.setState(newValue);
    }
  }
});
