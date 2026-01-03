import { pendingWardrobeItems } from '@/storage';
import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';

type PersistedState = Pick<PendingWardrobeItemState, 'pendingWardrobeItems'>;

const pendingWardrobeItemsStateStorage: StateStorage<void> = {
  getItem: async () => {
    const value = await pendingWardrobeItems.getValue();
    return JSON.stringify({ state: value });
  },
  setItem: async (_: string, value: string) => {
    const parsed = JSON.parse(value)?.state as PersistedState;
    return pendingWardrobeItems.setValue(parsed);
  },
  removeItem: async () => {
    return pendingWardrobeItems.setValue({ pendingWardrobeItems: [] });
  },
};

export const usePendingWardrobeItemStore = create<PendingWardrobeItemState>()(
  persist(
    (set) => ({
      pendingWardrobeItems: [],
      prependItem: (item) =>
        set((state) => ({
          pendingWardrobeItems: [item, ...state.pendingWardrobeItems],
        })),
      updateItemByOptimisticId: (optimisticId, updates) =>
        set((state) => ({
          pendingWardrobeItems: state.pendingWardrobeItems.map((item) =>
            item.optimisticId === optimisticId ? { ...item, ...updates } : item
          ),
        })),
      updateItem: (id, updates) =>
        set((state) => ({
          pendingWardrobeItems: state.pendingWardrobeItems.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          ),
        })),
      removeItem: (optimisticId) =>
        set((state) => ({
          pendingWardrobeItems: state.pendingWardrobeItems.filter(
            (item) => item.optimisticId !== optimisticId
          ),
        })),
    }),
    {
      name: 'pending_wardrobe_items',
      storage: createJSONStorage(() => pendingWardrobeItemsStateStorage),
      partialize: (state) => ({
        pendingWardrobeItems: state.pendingWardrobeItems,
      }),
    }
  )
);
