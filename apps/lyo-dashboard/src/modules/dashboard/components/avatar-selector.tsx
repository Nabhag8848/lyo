import { useState, useRef, useEffect, useCallback } from 'react';

interface Avatar {
  id: string;
  url: string;
}

interface AvatarSelectorProps {
  avatars: Avatar[];
  selectedAvatarId?: string;
  onSelectAvatar: (avatarId: string) => void;
  isLoading?: boolean;
}

export const AvatarSelector = ({
  avatars,
  selectedAvatarId,
  onSelectAvatar,
  isLoading = false,
}: AvatarSelectorProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const avatarRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [paddingWidth, setPaddingWidth] = useState(400);

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      // Update padding width to allow centering
      setPaddingWidth(clientWidth / 2 - 96);
    }
  };

  // Auto-select avatar when it comes into center view
  const handleScroll = useCallback(() => {
    checkScrollability();

    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestAvatar: { id: string; distance: number } | null = null;

    avatarRefs.current.forEach((element, avatarId) => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const avatarCenter = rect.left + rect.width / 2;
      const distance = Math.abs(containerCenter - avatarCenter);

      // Check if avatar is in the visible area and closer to center
      if (rect.left < containerRect.right && rect.right > containerRect.left) {
        if (!closestAvatar || distance < closestAvatar.distance) {
          closestAvatar = { id: avatarId, distance };
        }
      }
    });

    // Only update if we found a close avatar (within reasonable distance)
    if (
      closestAvatar &&
      closestAvatar.distance < 150 &&
      closestAvatar.id !== selectedAvatarId
    ) {
      onSelectAvatar(closestAvatar.id);
    }
  }, [selectedAvatarId, onSelectAvatar]);

  useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', checkScrollability);
      // Initial check
      handleScroll();

      // Scroll first avatar to center when avatars are first loaded
      if (avatars.length > 0 && selectedAvatarId) {
        const firstAvatar = avatarRefs.current.get(avatars[0].id);
        if (firstAvatar && selectedAvatarId === avatars[0].id) {
          requestAnimationFrame(() => {
            const containerRect = container.getBoundingClientRect();
            const avatarRect = firstAvatar.getBoundingClientRect();
            const scrollLeft = container.scrollLeft;
            const avatarLeft =
              avatarRect.left - containerRect.left + scrollLeft;
            const containerCenter = containerRect.width / 2;
            const targetScroll =
              avatarLeft - containerCenter + avatarRect.width / 2;

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
  }, [avatars, handleScroll, selectedAvatarId]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current || !selectedAvatarId) return;

    const selectedIndex = avatars.findIndex((a) => a.id === selectedAvatarId);
    if (selectedIndex === -1) return;

    // Find next/previous avatar
    const nextIndex =
      direction === 'left'
        ? Math.max(0, selectedIndex - 1)
        : Math.min(avatars.length - 1, selectedIndex + 1);

    const nextAvatar = avatars[nextIndex];
    if (!nextAvatar) return;

    // Select the next avatar
    onSelectAvatar(nextAvatar.id);

    // Scroll it to center
    const nextAvatarElement = avatarRefs.current.get(nextAvatar.id);
    if (nextAvatarElement && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const containerRect = container.getBoundingClientRect();
      const avatarRect = nextAvatarElement.getBoundingClientRect();
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-[11px] font-bold tracking-[0.2em] text-stone-500 uppercase">
          Generating avatars...
        </div>
      </div>
    );
  }

  if (avatars.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      {/* Left scroll button */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-stone-50 text-stone-900 p-3 shadow-lg transition-all border border-stone-200"
          aria-label="Scroll left"
        >
          <svg
            className="w-5 h-5"
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

      {/* Avatar container with horizontal scroll */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto no-scrollbar scroll-smooth py-4"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* Left padding to allow first avatar to center */}
        <div
          className="flex-shrink-0"
          style={{ width: `${Math.max(0, paddingWidth)}px` }}
        />

        {avatars.map((avatar, index) => {
          const isSelected = selectedAvatarId === avatar.id;
          const selectedIndex = avatars.findIndex(
            (a) => a.id === selectedAvatarId
          );
          const distanceFromSelected = Math.abs(
            index - (selectedIndex !== -1 ? selectedIndex : 0)
          );

          // Simple opacity and scale for selection feedback
          const scale = isSelected ? 1.05 : 1;
          const opacity = isSelected ? 1 : 0.6;

          return (
            <button
              key={avatar.id}
              ref={(el) => {
                if (el) {
                  avatarRefs.current.set(avatar.id, el);
                } else {
                  avatarRefs.current.delete(avatar.id);
                }
              }}
              onClick={() => {
                onSelectAvatar(avatar.id);
                // Scroll avatar to center
                const avatarElement = avatarRefs.current.get(avatar.id);
                if (scrollContainerRef.current && avatarElement) {
                  const container = scrollContainerRef.current;
                  const containerRect = container.getBoundingClientRect();
                  const avatarRect = avatarElement.getBoundingClientRect();
                  const scrollLeft = container.scrollLeft;
                  const avatarLeft =
                    avatarRect.left - containerRect.left + scrollLeft;
                  const containerCenter = containerRect.width / 2;
                  const targetScroll =
                    avatarLeft - containerCenter + avatarRect.width / 2;

                  container.scrollTo({
                    left: targetScroll,
                    behavior: 'smooth',
                  });
                }
              }}
              className="flex-shrink-0 w-48 h-60 rounded-xl overflow-hidden transition-all duration-300 ease-out flex items-center justify-center"
              style={{
                transform: `scale(${scale})`,
                opacity,
                marginLeft: index === 0 ? 0 : '-32px',
                zIndex: isSelected ? 10 : 1,
              }}
            >
              <img
                src={avatar.url}
                alt={`Avatar ${avatar.id}`}
                className="max-w-full max-h-full object-contain"
              />
            </button>
          );
        })}

        {/* Right padding to allow last avatar to center */}
        <div
          className="flex-shrink-0"
          style={{ width: `${Math.max(0, paddingWidth)}px` }}
        />
      </div>

      {/* Right scroll button */}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-stone-50 text-stone-900 p-3 shadow-lg transition-all border border-stone-200"
          aria-label="Scroll right"
        >
          <svg
            className="w-5 h-5"
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
