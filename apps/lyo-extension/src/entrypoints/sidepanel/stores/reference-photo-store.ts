import { create } from "zustand";

export const useReferencePhotoStore = create<ReferencePhotoState>()((set) => ({
  referencePhoto: null,
  setReferencePhoto: (referencePhoto: ReferencePhoto | null) =>
    set({ referencePhoto }),
}));