import { useCallback, useEffect, useRef } from 'react';
import { useWardrobeWithGenerations } from '../hooks/use-wardrobe-with-generations';
import { WardrobeItemShimmer } from './WardrobeShimmer';

interface WardrobeProps {
  selectedAvatar: number;
  setSelectedAvatar: (index: number) => void;
}

/**
 * Gets a unique key for a wardrobe display item
 */
function getItemKey(item: WardrobeDisplayItem): string {
  if (item.type === 'reference') {
    return 'reference';
  }
  if (item.type === 'pending') {
    return `pending-${item.generation.id}`;
  }
  return `completed-${item.item.id}`;
}

/**
 * Gets the image URL to display for a wardrobe item in the carousel
 */
function getCarouselImageUrl(item: WardrobeDisplayItem): string {
  if (item.type === 'reference') {
    return item.imageUrl;
  }
  if (item.type === 'pending') {
    // If generation is complete, show generated image
    // Otherwise this shouldn't be called (we use shimmer for pending)
    return item.generation.generatedImageUrl || '';
  }
  return item.item.signedUrl;
}

/**
 * Checks if item is currently generating (still pending, not completed)
 */
function isGenerating(item: WardrobeDisplayItem): boolean {
  return item.type === 'pending' && item.generation.status === 'pending';
}

/**
 * Checks if item is a completed generation from current session
 */
function isCompletedGeneration(item: WardrobeDisplayItem): boolean {
  return item.type === 'pending' && item.generation.status === 'completed';
}

export const Wardrobe = ({
  selectedAvatar,
  setSelectedAvatar,
}: WardrobeProps) => {
  const historyScrollRef = useRef<HTMLDivElement>(null);
  const avatarRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const {
    allItems,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    loadMore,
    referencePhotoUrl,
  } = useWardrobeWithGenerations();

  const handleHistoryScroll = useCallback(() => {
    if (!historyScrollRef.current) return;

    const container = historyScrollRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    type ClosestAvatar = { index: number; distance: number };
    let closestAvatar: ClosestAvatar | null = null;

    for (const [index, element] of avatarRefs.current.entries()) {
      if (!element) continue;

      const rect = element.getBoundingClientRect();
      const avatarCenter = rect.left + rect.width / 2;
      const distance = Math.abs(containerCenter - avatarCenter);

      // Check if avatar is in the visible area and closer to center
      if (rect.left < containerRect.right && rect.right > containerRect.left) {
        if (!closestAvatar || distance < closestAvatar.distance) {
          closestAvatar = { index, distance };
        }
      }
    }

    // Only update if we found a close avatar (within reasonable distance)
    if (
      closestAvatar &&
      closestAvatar.distance < 100 &&
      closestAvatar.index !== selectedAvatar
    ) {
      setSelectedAvatar(closestAvatar.index);
    }

    // Load more when scrolling near the end
    if (
      !isReachingEnd &&
      !isLoadingMore &&
      container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 100
    ) {
      loadMore();
    }
  }, [
    selectedAvatar,
    setSelectedAvatar,
    isReachingEnd,
    isLoadingMore,
    loadMore,
  ]);

  const scrollToAvatar = (index: number) => {
    setSelectedAvatar(index);
    const avatarElement = avatarRefs.current.get(index);
    if (historyScrollRef.current && avatarElement) {
      const container = historyScrollRef.current;
      const containerRect = container.getBoundingClientRect();
      const avatarRect = avatarElement.getBoundingClientRect();
      const scrollLeft = container.scrollLeft;
      const avatarLeft = avatarRect.left - containerRect.left + scrollLeft;
      const containerCenter = containerRect.width / 2;
      const targetScroll = avatarLeft - containerCenter + avatarRect.width / 2;

      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div>
      <div
        ref={historyScrollRef}
        className="flex overflow-x-auto pb-1 -mx-2 px-2 history-scroll scroll-smooth"
        style={{
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* Left padding to allow first avatar to center */}
        <div className="shrink-0 w-[calc(50%-1rem)]" />

        {/* Show shimmer while initial loading */}
        {isLoading && allItems.length === 0 && (
          <>
            {Array.from({ length: 8 }).map((_, index) => (
              <WardrobeItemShimmer
                key={index}
                referencePhotoUrl={referencePhotoUrl}
                isFirst={index === 0}
              />
            ))}
          </>
        )}

        {/* Render wardrobe items */}
        {allItems.map((item, index) => {
          const isSelected = selectedAvatar === index;
          const opacity = isSelected ? 1 : 0.6;
          const itemIsGenerating = isGenerating(item);
          const itemIsCompletedGeneration = isCompletedGeneration(item);

          // For generating items (pending), show shimmer with reference photo
          if (itemIsGenerating) {
            return (
              <button
                key={getItemKey(item)}
                ref={(el) => {
                  if (el) {
                    avatarRefs.current.set(index, el);
                  } else {
                    avatarRefs.current.delete(index);
                  }
                }}
                onClick={() => scrollToAvatar(index)}
                className={`shrink-0 w-16 h-28 rounded overflow-hidden transition-all duration-300 ease-out flex items-center justify-center ${
                  index === 0 ? '' : '-ml-4'
                }`}
                style={{
                  opacity,
                  zIndex: isSelected ? 10 : 1,
                }}
              >
                {/* Use reference photo for shimmer effect */}
                <img
                  src={referencePhotoUrl || ''}
                  alt="Generating..."
                  className="max-w-full max-h-full object-contain shimmer-opacity"
                  style={{
                    filter: 'brightness(0)',
                    mixBlendMode: 'normal',
                  }}
                />
              </button>
            );
          }

          // For completed generation from current session, show generated image
          if (itemIsCompletedGeneration) {
            const pendingItem = item as {
              type: 'pending';
              generation: PendingGeneration;
            };
            return (
              <button
                key={getItemKey(item)}
                ref={(el) => {
                  if (el) {
                    avatarRefs.current.set(index, el);
                  } else {
                    avatarRefs.current.delete(index);
                  }
                }}
                onClick={() => scrollToAvatar(index)}
                className={`shrink-0 w-16 h-28 rounded overflow-hidden transition-all duration-300 ease-out flex items-center justify-center ${
                  index === 0 ? '' : '-ml-4'
                }`}
                style={{
                  opacity,
                  zIndex: isSelected ? 10 : 1,
                }}
              >
                <img
                  src={pendingItem.generation.generatedImageUrl || ''}
                  alt="Generated try-on"
                  className="max-w-full max-h-full object-contain"
                />
              </button>
            );
          }

          // For completed wardrobe items from API
          return (
            <button
              key={getItemKey(item)}
              ref={(el) => {
                if (el) {
                  avatarRefs.current.set(index, el);
                } else {
                  avatarRefs.current.delete(index);
                }
              }}
              onClick={() => scrollToAvatar(index)}
              className={`shrink-0 w-16 h-28 rounded overflow-hidden transition-all duration-300 ease-out flex items-center justify-center ${
                index === 0 ? '' : '-ml-4'
              }`}
              style={{
                opacity,
                zIndex: isSelected ? 10 : 1,
              }}
            >
              <img
                src={getCarouselImageUrl(item)}
                alt={`Wardrobe item ${index}`}
                className="max-w-full max-h-full object-contain"
              />
            </button>
          );
        })}

        {/* Show shimmer for loading more items */}
        {isLoadingMore && !isLoading && (
          <>
            {Array.from({ length: 8 }).map((_, index) => (
              <WardrobeItemShimmer
                key={`loading-more-${index}`}
                referencePhotoUrl={referencePhotoUrl}
                isFirst={false}
              />
            ))}
          </>
        )}

        {/* Right padding to allow last avatar to center */}
        <div className="shrink-0 w-[calc(50%-1rem)]" />
      </div>
    </div>
  );
};
