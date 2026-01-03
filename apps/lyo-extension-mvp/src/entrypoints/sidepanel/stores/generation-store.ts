import { create } from 'zustand';
import { pendingGenerationsStorage } from '@/lib/storage';

interface GenerationState {
  // Map of generationId -> generation status
  pendingGenerations: Map<string, PendingGeneration>;
  isHydrated: boolean;

  // Actions
  hydrate: () => Promise<void>;
  startGeneration: (
    id: string,
    productInfo: ProductInfo,
    productImageUrl: string
  ) => void;
  completeGeneration: (id: string, imageUrl: string) => void;
  clearCompletedGenerations: () => void;
  getGeneration: (id: string) => PendingGeneration | undefined;
  getPendingGenerations: () => PendingGeneration[];
}

export const useGenerationStore = create<GenerationState>((set, get) => ({
  pendingGenerations: new Map(),
  isHydrated: false,

  // Initialize from Chrome Storage and set up watching
  hydrate: async () => {
    const stored = await pendingGenerationsStorage.getValue();
    if (stored && stored.length > 0) {
      set({
        pendingGenerations: new Map(stored.map((g) => [g.id, g])),
        isHydrated: true,
      });
    } else {
      set({ isHydrated: true });
    }

    // Watch for changes from background script
    pendingGenerationsStorage.watch((newValue) => {
      if (newValue) {
        set({
          pendingGenerations: new Map(newValue.map((g) => [g.id, g])),
        });
      } else {
        set({ pendingGenerations: new Map() });
      }
    });
  },

  startGeneration: (
    id: string,
    productInfo: ProductInfo,
    productImageUrl: string
  ) => {
    const { pendingGenerations } = get();
    const newGeneration: PendingGeneration = {
      id,
      status: 'pending',
      productImageUrl,
      productInfo,
      createdAt: Date.now(),
    };

    const updated = new Map(pendingGenerations);
    updated.set(id, newGeneration);
    set({ pendingGenerations: updated });

    // Persist to storage (for background script sync)
    pendingGenerationsStorage.setValue(Array.from(updated.values()));
  },

  completeGeneration: (id: string, imageUrl: string) => {
    const { pendingGenerations } = get();
    const generation = pendingGenerations.get(id);

    if (generation) {
      const updated = new Map(pendingGenerations);
      updated.set(id, {
        ...generation,
        status: 'completed',
        generatedImageUrl: imageUrl,
      });
      set({ pendingGenerations: updated });

      // Persist to storage
      pendingGenerationsStorage.setValue(Array.from(updated.values()));
    }
  },

  clearCompletedGenerations: () => {
    const { pendingGenerations } = get();
    const pending = new Map<string, PendingGeneration>();

    for (const [id, gen] of pendingGenerations) {
      if (gen.status === 'pending') {
        pending.set(id, gen);
      }
    }

    set({ pendingGenerations: pending });
    pendingGenerationsStorage.setValue(Array.from(pending.values()));
  },

  getGeneration: (id: string) => {
    return get().pendingGenerations.get(id);
  },

  getPendingGenerations: () => {
    return Array.from(get().pendingGenerations.values()).filter(
      (g) => g.status === 'pending'
    );
  },
}));
