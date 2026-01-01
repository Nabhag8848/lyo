import { useMemo } from 'react';
import { useWardrobe } from './use-wardrobe';
import { useReferencePhoto } from './use-reference-photo';
import { useProduct } from './use-product';
import { useGenerationStore } from '../stores/generation-store';

/**
 * Combines wardrobe items with pending generations into a unified list.
 *
 * Key behavior:
 * - When a generation is pending (triggered via "Try On"), it appears at position 0
 *   and shows as a shimmer (using reference photo)
 * - When generation completes, the generated image replaces the shimmer at position 0
 * - Reference photo is NOT a separate item - it's only used for the shimmer effect
 * - Multiple pending generations appear at positions 0, 1, 2... (newest first)
 * - Completed wardrobe items from API come after pending generations
 *
 * Order:
 * 1. Pending generations (newest first - shimmer items that become generated images)
 * 2. Completed wardrobe items (from API)
 */
export function useWardrobeWithGenerations() {
  const {
    wardrobeItems,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    loadMore,
    error,
  } = useWardrobe();
  const { data: referencePhoto } = useReferencePhoto();
  const product = useProduct();
  const pendingGenerations = useGenerationStore((s) => s.pendingGenerations);

  const allItems = useMemo(() => {
    const items: WardrobeDisplayItem[] = [];

    // Get all generations (both pending and completed from current session)
    // These are generations triggered via "Try On" button
    const allGenerations = Array.from(pendingGenerations.values()).sort(
      (a, b) => b.createdAt - a.createdAt
    );

    // 1. Add pending/recent generations at the beginning (position 0, 1, 2...)
    // These represent try-ons from the current session
    for (const gen of allGenerations) {
      items.push({
        type: 'pending',
        generation: gen,
      });
    }

    // 2. Completed wardrobe items (from API - already sorted by server)
    // Filter out any that match generations we already have
    const generationSourceUrls = new Set(
      allGenerations.map((g) => g.productInfo.sourceUrl)
    );

    for (const item of wardrobeItems) {
      // Skip items that match a pending/recent generation (to avoid duplicates)
      // The generation will show the most recent try-on result
      if (!generationSourceUrls.has(item.garment.sourceUrl)) {
        items.push({
          type: 'completed',
          item,
        });
      }
    }

    return items;
  }, [pendingGenerations, wardrobeItems]);

  // Calculate the number of pending (not yet completed) generations
  const pendingCount = useMemo(() => {
    return Array.from(pendingGenerations.values()).filter(
      (g) => g.status === 'pending'
    ).length;
  }, [pendingGenerations]);

  // Check if we have an active product context (opened via Try On button)
  const hasActiveProduct = !!(product && referencePhoto?.url);

  return {
    allItems,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    loadMore,
    error,
    pendingCount,
    hasActiveProduct,
    referencePhotoUrl: referencePhoto?.url,
  };
}
