import { create } from 'zustand';

export const useWardrobeStore = create<WardrobeState>()(() => ({
  wardrobe: [],
}));
