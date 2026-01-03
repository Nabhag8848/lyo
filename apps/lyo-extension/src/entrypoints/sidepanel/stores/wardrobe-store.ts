import { WardrobeItemStatus } from '@/constants/wardrobe-item-status';
import { create } from 'zustand';

export const useWardrobeStore = create<WardrobeState>()((set) => ({
  wardrobe: [],
  setWardrobe: (wardrobe: Array<WardrobeResponse>) =>
    set(({ wardrobe: currentWardrobe }) => {
      const mergeMap = new Map<string, WardrobeItem>();

      const newWardrobe: Array<WardrobeItem> = wardrobe
        .flatMap<WardrobeItemResponse>((response) => response.wardrobe)
        .map((item) => {
          return {
            ...item,
            status: WardrobeItemStatus.COMPLETED,
          };
        });

      for (const item of currentWardrobe) {
        mergeMap.set(item.id, item);
      }

      for (const item of newWardrobe) {
        mergeMap.set(item.id, item);
      }

      const mergedWardrobe = Array.from(mergeMap.values());

      return {
        wardrobe: mergedWardrobe,
      };
    }),
  prependWardrobeItem: (wardrobeItem: WardrobeItem) =>
    set(({ wardrobe: currentWardrobe }) => {
      const wardrobeItemId = wardrobeItem.id;
      const existingItemIndex = currentWardrobe.findIndex(
        (item) => item.id === wardrobeItemId
      );
      const newWardrobe: WardrobeItem[] = [...currentWardrobe];

      if (existingItemIndex > -1) {
        newWardrobe[existingItemIndex] = wardrobeItem;
      } else {
        newWardrobe.unshift(wardrobeItem);
      }

      return {
        wardrobe: newWardrobe,
      };
    }),
}));
