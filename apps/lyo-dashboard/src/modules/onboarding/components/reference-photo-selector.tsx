import { useState, useRef, useEffect, useCallback } from 'react';

export const ReferencePhotoSelector = ({
  referencePhotos,
  selectedReferencePhotoId,
  onSelectReferencePhoto,
  isLoading = false,
}: ReferencePhotoSelectorProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const referencePhotoRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [paddingWidth, setPaddingWidth] = useState(400);

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      // Update padding width to allow centering - adjust based on reference photo size
      // Reference photo width: 96px (lg), 128px (md), 96px (sm), 96px (base)
      const isLarge = window.matchMedia('(min-width: 1024px)').matches;
      const isMedium = window.matchMedia('(min-width: 768px)').matches;
      const isSmall = window.matchMedia('(min-width: 640px)').matches;
      const referencePhotoWidth = isLarge
        ? 192
        : isMedium
        ? 160
        : isSmall
        ? 128
        : 96;
      setPaddingWidth(clientWidth / 2 - referencePhotoWidth / 2);
    }
  };

  // Auto-select reference photo when it comes into center view
  const handleScroll = useCallback(() => {
    checkScrollability();

    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    type ClosestReferencePhoto = { id: string; distance: number };
    let closestReferencePhoto: ClosestReferencePhoto | null = null;

    for (const [
      referencePhotoId,
      element,
    ] of referencePhotoRefs.current.entries()) {
      if (!element) continue;

      const rect = element.getBoundingClientRect();
      const referencePhotoCenter = rect.left + rect.width / 2;
      const distance = Math.abs(containerCenter - referencePhotoCenter);

      // Check if reference photo is in the visible area and closer to center
      if (rect.left < containerRect.right && rect.right > containerRect.left) {
        if (
          !closestReferencePhoto ||
          distance < closestReferencePhoto.distance
        ) {
          closestReferencePhoto = { id: referencePhotoId, distance };
        }
      }
    }

    // Only update if we found a close reference photo (within reasonable distance)
    if (
      closestReferencePhoto &&
      closestReferencePhoto.distance < 150 &&
      closestReferencePhoto.id !== selectedReferencePhotoId
    ) {
      onSelectReferencePhoto(closestReferencePhoto.id);
    }
  }, [selectedReferencePhotoId, onSelectReferencePhoto]);

  useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', checkScrollability);
      // Initial check
      handleScroll();

      // Scroll first reference photo to center when reference photos are first loaded
      if (referencePhotos.length > 0 && selectedReferencePhotoId) {
        const firstReferencePhoto = referencePhotoRefs.current.get(
          referencePhotos[0].id
        );
        if (
          firstReferencePhoto &&
          selectedReferencePhotoId === referencePhotos[0].id
        ) {
          requestAnimationFrame(() => {
            const containerRect = container.getBoundingClientRect();
            const referencePhotoRect =
              firstReferencePhoto.getBoundingClientRect();
            const scrollLeft = container.scrollLeft;
            const referencePhotoLeft =
              referencePhotoRect.left - containerRect.left + scrollLeft;
            const containerCenter = containerRect.width / 2;
            const targetScroll =
              referencePhotoLeft -
              containerCenter +
              referencePhotoRect.width / 2;

            container.scrollTo({
              left: targetScroll,
              behavior: 'smooth',
            });
          });
        }
      }

      return () => {
        container.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', checkScrollability);
      };
    }
    return undefined;
  }, [referencePhotos, handleScroll, selectedReferencePhotoId]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current || !selectedReferencePhotoId) return;

    const selectedIndex = referencePhotos.findIndex(
      (a) => a.id === selectedReferencePhotoId
    );
    if (selectedIndex === -1) return;

    // Find next/previous reference photo
    const nextIndex =
      direction === 'left'
        ? Math.max(0, selectedIndex - 1)
        : Math.min(referencePhotos.length - 1, selectedIndex + 1);

    const nextReferencePhoto = referencePhotos[nextIndex];
    if (!nextReferencePhoto) return;

    // Select the next reference photo
    onSelectReferencePhoto(nextReferencePhoto.id);

    // Scroll it to center
    const nextReferencePhotoElement = referencePhotoRefs.current.get(
      nextReferencePhoto.id
    );
    if (nextReferencePhotoElement && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const containerRect = container.getBoundingClientRect();
      const referencePhotoRect =
        nextReferencePhotoElement.getBoundingClientRect();
      const scrollLeft = container.scrollLeft;
      const referencePhotoLeft =
        referencePhotoRect.left - containerRect.left + scrollLeft;
      const containerCenter = containerRect.width / 2;
      const targetScroll =
        referencePhotoLeft - containerCenter + referencePhotoRect.width / 2;

      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-[11px] font-bold tracking-[0.2em] text-stone-500 uppercase">
          Generating reference photos...
        </div>
      </div>
    );
  }

  if (referencePhotos.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      {/* Left scroll button */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-stone-50 text-stone-900 p-2 sm:p-2.5 lg:p-3 shadow-lg transition-all border border-stone-200"
          aria-label="Scroll left"
        >
          <svg
            className="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {/* Reference photo container with horizontal scroll */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto no-scrollbar scroll-smooth py-2 sm:py-3 lg:py-4"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* Left padding to allow first reference photo to center */}
        <div
          className="shrink-0"
          style={{ width: `${Math.max(0, paddingWidth)}px` }}
        />

        {referencePhotos.map((referencePhoto, index) => {
          // Simple opacity and scale for selection feedback
          const isSelected = referencePhoto.id === selectedReferencePhotoId;
          const scale = isSelected ? 1.05 : 1;
          const opacity = isSelected ? 1 : 0.6;

          return (
            <button
              key={referencePhoto.id}
              ref={(el) => {
                if (el) {
                  referencePhotoRefs.current.set(referencePhoto.id, el);
                } else {
                  referencePhotoRefs.current.delete(referencePhoto.id);
                }
              }}
              onClick={() => {
                onSelectReferencePhoto(referencePhoto.id);
                // Scroll reference photo to center
                const referencePhotoElement = referencePhotoRefs.current.get(
                  referencePhoto.id
                );
                if (scrollContainerRef.current && referencePhotoElement) {
                  const container = scrollContainerRef.current;
                  const containerRect = container.getBoundingClientRect();
                  const referencePhotoRect =
                    referencePhotoElement.getBoundingClientRect();
                  const scrollLeft = container.scrollLeft;
                  const referencePhotoLeft =
                    referencePhotoRect.left - containerRect.left + scrollLeft;
                  const containerCenter = containerRect.width / 2;
                  const targetScroll =
                    referencePhotoLeft -
                    containerCenter +
                    referencePhotoRect.width / 2;

                  container.scrollTo({
                    left: targetScroll,
                    behavior: 'smooth',
                  });
                }
              }}
              className={`shrink-0 w-24 h-32 sm:w-32 sm:h-40 md:w-40 md:h-52 lg:w-48 lg:h-60 rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 ease-out flex items-center justify-center ${
                index === 0 ? '' : '-ml-4 sm:-ml-6 lg:-ml-8'
              }`}
              style={{
                transform: `scale(${scale})`,
                opacity,
                zIndex: isSelected ? 10 : 1,
              }}
            >
              <img
                src={referencePhoto.url}
                alt={`Reference Photo ${referencePhoto.id}`}
                className="max-w-full max-h-full object-contain"
              />
            </button>
          );
        })}

        {/* Right padding to allow last reference photo to center */}
        <div
          className="shrink-0"
          style={{ width: `${Math.max(0, paddingWidth)}px` }}
        />
      </div>

      {/* Right scroll button */}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-stone-50 text-stone-900 p-2 sm:p-2.5 lg:p-3 shadow-lg transition-all border border-stone-200"
          aria-label="Scroll right"
        >
          <svg
            className="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
