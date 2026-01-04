import { useCallback, useRef } from 'react';
import { useSyncExternalStore } from 'react';
import { useWardrobeStore } from '@/entrypoints/sidepanel/stores';
import { useCurrentSelectedWardrobeItemStore } from '@/entrypoints/sidepanel/stores';
import { useWardrobe } from './use-wardrobe';

type Snapshot = {
  closestIndex: number | null;
  closestDistance: number;
} | null;

export const useHistoryScroll = () => {
  const historyScrollRef = useRef<HTMLDivElement>(null);
  const avatarRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const lastSnapshotRef = useRef<Snapshot>(null);

  const wardrobe = useWardrobeStore((state) => state.wardrobe);
  const setCurrentSelectedWardrobeItem = useCurrentSelectedWardrobeItemStore(
    (state) => state.setCurrentSelectedWardrobeItem
  );
  const currentSelectedWardrobeItem = useCurrentSelectedWardrobeItemStore(
    (state) => state.currentSelectedWardrobeItem
  );

  // Get pagination state from useWardrobe hook
  const { hasMoreWardrobeItems, loadMoreWardrobeItems, isValidating } =
    useWardrobe();

  const getSnapshot = useCallback((): Snapshot => {
    const container = historyScrollRef.current;
    if (!container || !avatarRefs.current) {
      // Return cached null snapshot if already null, otherwise cache and return null
      if (lastSnapshotRef.current === null) {
        return null;
      }
      lastSnapshotRef.current = null;
      return null;
    }

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestIndex: number | null = null;
    let closestDistance = Infinity;

    for (const [index, element] of avatarRefs.current.entries()) {
      if (!element) continue;

      const rect = element.getBoundingClientRect();
      const avatarCenter = rect.left + rect.width / 2;
      const distance = Math.abs(containerCenter - avatarCenter);

      // Check if avatar is in the visible area
      if (rect.left < containerRect.right && rect.right > containerRect.left) {
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      }
    }

    // Only create a new object if values have actually changed
    const lastSnapshot = lastSnapshotRef.current;
    if (
      lastSnapshot !== null &&
      lastSnapshot.closestIndex === closestIndex &&
      lastSnapshot.closestDistance === closestDistance
    ) {
      return lastSnapshot;
    }

    const newSnapshot: Snapshot = { closestIndex, closestDistance };
    lastSnapshotRef.current = newSnapshot;
    return newSnapshot;
  }, []);

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const container = historyScrollRef.current;
      if (!container)
        return () => {
          return;
        };

      const handleScroll = () => {
        const snapshot = getSnapshot();
        if (!snapshot) {
          onStoreChange();
          return;
        }

        const closestIndex = snapshot.closestIndex;
        const closestDistance = snapshot.closestDistance;

        // 1. Update store when scroll changes (avatar selection)
        // Only update if we found a close avatar (within reasonable distance)
        if (closestIndex !== null && closestDistance < 100) {
          const wardrobeItem = wardrobe[closestIndex];
          if (
            wardrobeItem &&
            wardrobeItem.id !== currentSelectedWardrobeItem?.id
          ) {
            setCurrentSelectedWardrobeItem(wardrobeItem);
          }
        }

        // 2. Load more when scrolling near the end (pagination)
        if (
          hasMoreWardrobeItems &&
          !isValidating &&
          container.scrollLeft + container.clientWidth >=
            container.scrollWidth - 100
        ) {
          loadMoreWardrobeItems();
        }

        // Notify React that the store changed
        onStoreChange();
      };

      container.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();

      return () => container.removeEventListener('scroll', handleScroll);
    },
    [
      getSnapshot,
      wardrobe,
      currentSelectedWardrobeItem,
      setCurrentSelectedWardrobeItem,
      hasMoreWardrobeItems,
      isValidating,
      loadMoreWardrobeItems,
    ]
  );

  useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return { historyScrollRef, avatarRefs };
};
