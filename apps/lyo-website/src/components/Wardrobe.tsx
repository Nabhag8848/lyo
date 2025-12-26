import { useCallback, useEffect, useRef } from 'react';

export const Wardrobe = ({
  selectedAvatar,
  setSelectedAvatar,
  avatarImages,
}: {
  selectedAvatar: number;
  setSelectedAvatar: (index: number) => void;
  avatarImages: string[];
}) => {
  const historyScrollRef = useRef<HTMLDivElement>(null);
  const avatarRefs = useRef<Map<number, HTMLButtonElement>>(new Map());

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
  }, [selectedAvatar, setSelectedAvatar]);

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
    <div className="mt-0.5 lg:mt-0">
      <span className="text-[0.35rem] md:text-[0.4rem] lg:text-[0.375rem] xl:text-[0.45rem] 2xl:text-[0.55rem] font-bold text-stone-400 uppercase tracking-[0.2em] block mb-0.5 md:mb-0.75 lg:mb-0.5 xl:mb-0.75 2xl:mb-1">
        WARDROBE
      </span>
      <style>{`
      .history-scroll::-webkit-scrollbar {
        display: none;
      }
      .history-scroll {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `}</style>
      <div
        ref={historyScrollRef}
        className="flex overflow-x-auto pb-0.5 -mx-2 px-2 history-scroll scroll-smooth"
        style={{
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* Left padding to allow first avatar to center */}
        <div className="shrink-0 w-[calc(50%-1.5rem)] sm:w-[calc(50%-1.75rem)] md:w-[calc(50%-2rem)] lg:w-[calc(50%-1.5rem)] xl:w-[calc(50%-2rem)] 2xl:w-[calc(50%-3.5rem)]" />

        {avatarImages.map((avatar, index) => {
          const isSelected = selectedAvatar === index;
          const opacity = isSelected ? 1 : 0.6;

          return (
            <button
              key={index}
              ref={(el) => {
                if (el) {
                  avatarRefs.current.set(index, el);
                } else {
                  avatarRefs.current.delete(index);
                }
              }}
              onClick={() => scrollToAvatar(index)}
              className={`shrink-0 w-12 h-16 sm:w-14 sm:h-18 md:w-16 md:h-20 lg:w-14 lg:h-18 xl:w-20 xl:h-24 2xl:w-28 2xl:h-32 rounded overflow-hidden transition-all duration-300 ease-out flex items-center justify-center ${
                index === 0
                  ? ''
                  : '-ml-6 sm:-ml-7 md:-ml-8 lg:-ml-7 xl:-ml-10 2xl:-ml-14'
              }`}
              style={{
                opacity,
                zIndex: isSelected ? 10 : 1,
              }}
            >
              <img
                src={avatar}
                alt={`History ${index + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </button>
          );
        })}

        {/* Right padding to allow last avatar to center */}
        <div className="shrink-0 w-[calc(50%-1.5rem)] sm:w-[calc(50%-1.75rem)] md:w-[calc(50%-2rem)] lg:w-[calc(50%-1.5rem)] xl:w-[calc(50%-2rem)] 2xl:w-[calc(50%-3.5rem)]" />
      </div>
    </div>
  );
};
