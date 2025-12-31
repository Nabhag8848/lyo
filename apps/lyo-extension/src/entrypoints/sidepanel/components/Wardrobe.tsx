import { useCallback, useEffect, useRef } from 'react';
import { useWardrobe } from '../hooks/use-wardrobe';
import { useReferencePhoto } from '../hooks/use-reference-photo';
import { useProduct } from '../hooks/use-product';
import { WardrobeItemShimmer } from './WardrobeShimmer';

interface WardrobeProps {
  selectedAvatar: number;
  setSelectedAvatar: (index: number) => void;
}

export const Wardrobe = ({
  selectedAvatar,
  setSelectedAvatar,
}: WardrobeProps) => {
  const historyScrollRef = useRef<HTMLDivElement>(null);
  const avatarRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const { wardrobeItems, isLoading, isLoadingMore, isReachingEnd, loadMore } =
    useWardrobe();
  const { data: referencePhoto } = useReferencePhoto();
  const product = useProduct();

  // Combine reference photo (index 0) with wardrobe items - only include reference photo if product exists
  const allItems: Array<{
    id: string;
    imageUrl: string;
    isReference: boolean;
    garment?: WardrobeItem['garment'];
  }> = [];

  // Only add reference photo if product exists (when sidepanel opened with tryon button)
  if (product && referencePhoto?.url) {
    allItems.push({
      id: 'reference',
      imageUrl: referencePhoto.url,
      isReference: true,
    });
  }

  wardrobeItems.forEach((item) => {
    allItems.push({
      id: item.id,
      imageUrl: item.signedUrl,
      isReference: false,
      garment: item.garment,
    });
  });

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

  useEffect(() => {
    const container = historyScrollRef.current;
    if (container) {
      container.addEventListener('scroll', handleHistoryScroll);
      // Initial check
      handleHistoryScroll();

      return () => {
        container.removeEventListener('scroll', handleHistoryScroll);
      };
    }
    return undefined;
  }, [handleHistoryScroll]);

  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[0.5rem] font-bold text-stone-400 uppercase tracking-[0.2em]">
          WARDROBE
        </span>
      </div>
      <style>{`
      .history-scroll::-webkit-scrollbar {
        display: none;
      }
      .history-scroll {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      @keyframes shimmer-opacity {
        0% {
          opacity: 0.3;
        }
        50% {
          opacity: 0.7;
        }
        100% {
          opacity: 0.3;
        }
      }
      .shimmer-opacity {
        animation: shimmer-opacity 1.5s ease-in-out infinite;
      }
    `}</style>
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
                referencePhotoUrl={
                  product && referencePhoto?.url
                    ? referencePhoto.url
                    : undefined
                }
                isFirst={index === 0 && !!(product && referencePhoto?.url)}
              />
            ))}
          </>
        )}

        {/* Render wardrobe items */}
        {allItems.map((item, index) => {
          const isSelected = selectedAvatar === index;
          const opacity = isSelected ? 1 : 0.6;

          return (
            <button
              key={item.id}
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
                src={item.imageUrl}
                alt={
                  item.isReference
                    ? 'Reference photo'
                    : `Wardrobe item ${index}`
                }
                className="max-w-full max-h-full object-contain"
                style={
                  item.isReference
                    ? {
                        filter: 'brightness(0)',
                        mixBlendMode: 'normal',
                        opacity: 0.8,
                      }
                    : undefined
                }
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
                referencePhotoUrl={
                  product && referencePhoto?.url
                    ? referencePhoto.url
                    : undefined
                }
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
