import { WardrobeItemStatus } from '@/constants/wardrobe-item-status';
import { pendingWardrobeItems } from '@/storage';
import { create } from 'zustand';
import { useReferencePhotoStore } from './reference-photo-store';

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
  syncPendingItems: (pendingItems: PendingWardrobeItem[]) =>
    set(({ wardrobe: currentWardrobe }) => {
      const { referencePhoto } = useReferencePhotoStore.getState();

      // Use a Map for O(1) lookups - key by id
      const wardrobeMap = new Map<string, WardrobeItem>(
        currentWardrobe.map((item) => [item.id, item])
      );

      // Track items to prepend (Case 1)
      const itemsToPrepend: WardrobeItem[] = [];

      // Track ID swaps: optimisticId → newId (Case 2)
      const idSwaps = new Map<string, string>();

      for (const pendingItem of pendingItems) {
        const { optimisticId, id, signedUrl, status, garment } = pendingItem;

        // Case 1: optimisticId present, status pending, no id/signedUrl
        // -> prepend with reference photo as signedUrl, optimisticId as id
        if (status === WardrobeItemStatus.PENDING && !id && !signedUrl) {
          if (!wardrobeMap.has(optimisticId)) {
            const newItem: WardrobeItem = {
              id: optimisticId,
              signedUrl: referencePhoto?.url ?? '',
              status: WardrobeItemStatus.PENDING,
              garment,
            };
            itemsToPrepend.push(newItem);
            wardrobeMap.set(optimisticId, newItem);
          }
          continue;
        }

        // Case 2: optimisticId present, status pending, id present, no signedUrl
        // -> update item where optimisticId === wardrobe item id, set new id
        if (status === WardrobeItemStatus.PENDING && id && !signedUrl) {
          const existingItem = wardrobeMap.get(optimisticId);
          if (existingItem) {
            wardrobeMap.delete(optimisticId);
            const updatedItem = { ...existingItem, id };
            wardrobeMap.set(id, updatedItem);
            // Track the swap so we can find it during reconstruction
            idSwaps.set(optimisticId, id);
          }
          continue;
        }

        // Case 3: optimisticId present, status completed, id present, signedUrl present
        // -> update item where id matches, set signedUrl and status completed
        if (status === WardrobeItemStatus.COMPLETED && id && signedUrl) {
          const existingItem = wardrobeMap.get(id);
          if (existingItem) {
            wardrobeMap.set(id, {
              ...existingItem,
              signedUrl,
              status: WardrobeItemStatus.COMPLETED,
            });
          }
        }
      }

      // Reconstruct wardrobe: prepended items first, then existing (preserving order)
      const existingIds = new Set(itemsToPrepend.map((item) => item.id));
      const existingItems = currentWardrobe
        .map((item) => {
          // Check if this item's ID was swapped (Case 2)
          const newId = idSwaps.get(item.id);
          const lookupId = newId ?? item.id;
          return wardrobeMap.get(lookupId) ?? item;
        })
        .filter((item) => !existingIds.has(item.id));

      return {
        wardrobe: [...itemsToPrepend, ...existingItems],
      };
    }),
}));

pendingWardrobeItems.watch(({ pendingWardrobeItems }) => {
  /*
    1. optimisticId is present and status is pending, id & signedUrl isnt present. 
      -> prepend to wardrobe with reference-photo as signedUrl & id as optimisticId & status as pending. useReferencePhotoStore to get reference-photo.
    2. optimisticId is present and status is pending, id is present, signedUrl isnt present.
      -> update the item having newValue.pendingWardrobeItems[index].optimisticId === wardrobe[index1].id in wardrobe 
      and set id of it as wardrobe[index1].id = newValue.pendingWardrobeItems[index].id
    3. optimisticId is present and status is completed, id is present, signedUrl is present.
      -> update the item having newValue.pendingWardrobeItems[index].id === wardrobe[index1].id in wardrobe 
      and set signedUrl of it as wardrobe[index1].signedUrl = newValue.pendingWardrobeItems[index].signedUrl & status as completed
  */

  const wardrobe = useWardrobeStore.getState();
  const { syncPendingItems } = wardrobe;
  syncPendingItems(pendingWardrobeItems);
});
