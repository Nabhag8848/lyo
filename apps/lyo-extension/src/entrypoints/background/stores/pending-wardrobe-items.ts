import { create } from 'zustand';

export const createPendingWardrobeItemStore =
  create<PendingWardrobeItemStore>()(() => ({
    pendingWardrobeItems: [],
  }));
