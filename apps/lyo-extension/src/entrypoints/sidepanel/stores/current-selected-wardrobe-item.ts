import { create } from 'zustand';
import { useWardrobeStore } from './wardrobe-store';

export const useCurrentSelectedWardrobeItemStore =
  create<CurrentSelectedWardrobeItemState>()((set) => ({
    currentSelectedWardrobeItem: null,
    setCurrentSelectedWardrobeItem: (wardrobeItem: WardrobeItem) =>
      set({ currentSelectedWardrobeItem: wardrobeItem }),
  }));

useWardrobeStore.subscribe((state, prevState) => {
  const newWardrobe = state.wardrobe;
  const oldWardrobe = prevState.wardrobe;

  if (newWardrobe.length === 0 || newWardrobe === oldWardrobe) return;

  const { currentSelectedWardrobeItem, setCurrentSelectedWardrobeItem } =
    useCurrentSelectedWardrobeItemStore.getState();

  // Case 1: Wardrobe was empty or first item changed (prepend) → select first item
  const firstItemChanged =
    newWardrobe[0]?.id !== oldWardrobe[0]?.id &&
    currentSelectedWardrobeItem?.id === oldWardrobe[0]?.id;

  const wasEmpty = oldWardrobe.length === 0;

  if (wasEmpty || firstItemChanged) {
    setCurrentSelectedWardrobeItem(newWardrobe[0]);
    return;
  }

  // Case 2: Current selected item was updated (id swap or status/signedUrl change)
  if (currentSelectedWardrobeItem) {
    const currentId = currentSelectedWardrobeItem.id;

    // Try to find updated item by current id
    const updatedItem = newWardrobe.find((item) => item.id === currentId);

    // If we found the updated item and it's different, sync it
    if (updatedItem && updatedItem !== currentSelectedWardrobeItem) {
      // Check if something actually changed (id, status, signedUrl)
      const hasChanged =
        updatedItem.id !== currentSelectedWardrobeItem.id ||
        updatedItem.status !== currentSelectedWardrobeItem.status ||
        updatedItem.signedUrl !== currentSelectedWardrobeItem.signedUrl;

      if (hasChanged) {
        setCurrentSelectedWardrobeItem(updatedItem);
      }
    }
  }
});
