import { useCallback } from 'react';
import {
  useHistoryScroll,
  useReferencePhoto,
  useWardrobe,
} from '@/entrypoints/sidepanel/hooks';
import {
  useCurrentSelectedWardrobeItemStore,
  useWardrobeStore,
} from '@/entrypoints/sidepanel/stores';
import { cn } from '@/entrypoints/sidepanel/utils/tailwind';
import { WardrobeItemShimmer } from './WardrobeItemShimmer';

export const Wardrobe = () => {
  const { historyScrollRef, avatarRefs } = useHistoryScroll();
  const currentSelectedWardrobeItem = useCurrentSelectedWardrobeItemStore(
    (state) => state.currentSelectedWardrobeItem
  );
  const setCurrentSelectedWardrobeItem = useCurrentSelectedWardrobeItemStore(
    (state) => state.setCurrentSelectedWardrobeItem
  );

  useReferencePhoto();

  const { isLoading, isValidating } = useWardrobe();
  const wardrobe = useWardrobeStore((state) => state.wardrobe);

  const isLoadingMore = isValidating && wardrobe.length > 0;

  const scrollToAvatar = useCallback(
    (wardrobeItem: WardrobeItem, index: number) => {
      setCurrentSelectedWardrobeItem(wardrobeItem);
      const avatarElement = avatarRefs.current.get(index);
      if (historyScrollRef.current && avatarElement) {
        const container = historyScrollRef.current;
        const containerRect = container.getBoundingClientRect();
        const avatarRect = avatarElement.getBoundingClientRect();
        const scrollLeft = container.scrollLeft;
        const avatarLeft = avatarRect.left - containerRect.left + scrollLeft;
        const containerCenter = containerRect.width / 2;
        const targetScroll =
          avatarLeft - containerCenter + avatarRect.width / 2;

        container.scrollTo({
          left: targetScroll,
          behavior: 'smooth',
        });
      }
    },
    [avatarRefs, historyScrollRef, setCurrentSelectedWardrobeItem]
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[0.5rem] font-bold text-stone-400 uppercase tracking-[0.2em]">
          WARDROBE
        </span>
      </div>
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
        {isLoading && wardrobe.length === 0 && (
          <>
            {Array.from({ length: 8 }).map((_, index) => (
              <WardrobeItemShimmer key={index} isFirst={index === 0} />
            ))}
          </>
        )}

        {/* Render wardrobe items */}
        {wardrobe.map((wardrobeItem, index) => {
          const isSelected =
            currentSelectedWardrobeItem?.id === wardrobeItem?.id;
          const isItemGenerating = wardrobeItem.status === 'pending';

          return (
            <button
              key={wardrobeItem.id}
              ref={(el) => {
                if (el) {
                  avatarRefs.current.set(index, el);
                } else {
                  avatarRefs.current.delete(index);
                }
              }}
              onClick={() => scrollToAvatar(wardrobeItem, index)}
              className={cn(
                `shrink-0 w-16 h-28 rounded overflow-hidden transition-all duration-300 ease-out flex items-center justify-center`,
                isSelected ? 'opacity-100 z-10' : 'opacity-60 z-1',
                index === 0 ? '' : '-ml-4'
              )}
            >
              {/* Use reference photo for shimmer effect */}
              <img
                src={wardrobeItem.signedUrl}
                alt="Wardrobe Item or Reference Photo"
                className={cn(
                  'max-w-full max-h-full object-contain',
                  isItemGenerating &&
                    'shimmer-opacity brightness-0 mix-blend-normal'
                )}
              />
            </button>
          );
        })}

        {/* Show shimmer for loading more items (pagination) */}
        {isLoadingMore && (
          <>
            {Array.from({ length: 8 }).map((_, index) => (
              <WardrobeItemShimmer
                key={`loading-more-${index}`}
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
