import { useState, useEffect, useRef, useCallback } from 'react';

export const InteractiveBrowser = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const historyScrollRef = useRef<HTMLDivElement>(null);
  const avatarRefs = useRef<Map<number, HTMLButtonElement>>(new Map());

  const openPanel = () => {
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
  };

  // Simulate loading animation
  useEffect(() => {
    if (isPanelOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isPanelOpen]);

  const avatarImages = [
    'https://tryonn.s3.ap-south-1.amazonaws.com/model-1-removebg-preview.png',
    'https://tryonn.s3.ap-south-1.amazonaws.com/model-2-removebg-preview.png',
    'https://tryonn.s3.ap-south-1.amazonaws.com/model-3-removebg-preview.png',
    'https://tryonn.s3.ap-south-1.amazonaws.com/model-4-removebg-preview.png',
  ];

  const getImageSrc = (): string => {
    return avatarImages[selectedAvatar] || avatarImages[0];
  };

  // Handle scroll to auto-select avatar closest to center
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
  }, [selectedAvatar]);

  // Scroll selected avatar to center when clicked
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
    <div className="relative animate-fade-in delay-100 perspective-1000">
      {/* Browser Mockup */}
      <div className="bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col h-[60vh] sm:h-[65vh] md:h-[68vh] lg:h-[70vh] xl:h-[72vh] 2xl:h-[75vh] max-h-[700px] md:max-h-[800px] lg:max-h-[900px] transform transition-transform duration-500">
        {/* Browser Header */}
        <div className="bg-stone-50 border-b border-stone-200 px-2 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-1.5 md:py-2 lg:py-3 xl:py-4 flex items-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 shrink-0">
          <div className="flex gap-0.5 sm:gap-1 md:gap-1.5">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full bg-stone-300"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full bg-stone-300"></div>
          </div>
          <div className="flex-1 bg-white h-5 sm:h-6 md:h-7 lg:h-8 xl:h-9 rounded border border-stone-200 text-[0.4rem] sm:text-[0.45rem] md:text-[0.5rem] lg:text-[0.55rem] xl:text-[0.625rem] flex items-center px-1.5 sm:px-2 md:px-3 lg:px-4 text-stone-500 font-bold overflow-hidden whitespace-nowrap tracking-widest font-sans">
            <span
              className="text-green-600 mr-2"
              role="img"
              aria-label="Secure"
            >
              🔒
            </span>
            MYNTRA.COM/MEN/TOPS
          </div>
        </div>

        {/* Viewport */}
        <div className="flex-1 flex relative overflow-visible min-h-0">
          {/* 1. STORE VIEW */}
          <div
            className={`flex-1 flex flex-col md:flex-row bg-white relative z-0 transition-all duration-500 ${
              isPanelOpen ? 'md:mr-0' : 'md:mr-0'
            }`}
          >
            {/* Breadcrumbs */}
            <div className="absolute top-1 sm:top-2 md:top-3 lg:top-4 left-1.5 sm:left-2 md:left-4 lg:left-6 xl:left-8 text-[0.4rem] sm:text-[0.45rem] md:text-[0.5rem] lg:text-[0.55rem] text-stone-400 uppercase tracking-[0.2em] z-10 font-bold">
              Home / Men / <span className="text-black">H&M</span>
            </div>

            {/* Store Image */}
            <div className="w-full md:w-[58%] h-[200px] sm:h-[250px] md:h-auto md:min-h-[200px] lg:min-h-[250px] flex-1 relative overflow-hidden bg-stone-100 group">
              <img
                src="https://tryonn.s3.ap-south-1.amazonaws.com/new.png"
                className="w-full h-full object-contain object-center scale-[1.0] sm:scale-[1.4] md:scale-[1.6] xl:scale-[1.9]"
                alt="Store Model"
              />
            </div>

            {/* Store Details */}
            <div className="w-full md:w-[42%] p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12 flex flex-col relative min-h-0 flex-1 overflow-hidden">
              <div className="flex-1 flex flex-col min-h-0 justify-between">
                <div className="flex flex-col shrink-0">
                  <div className="mb-2 sm:mb-2.5 md:mb-3 lg:mb-3.5 xl:mb-4">
                    <h3 className="font-display text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] lg:text-[1.375rem] xl:text-[1.5rem] text-stone-900 mb-1 sm:mb-1.25 md:mb-1.5 lg:mb-1.75 uppercase tracking-wide leading-tight">
                      H&M
                    </h3>
                    <p className="text-stone-500 text-[0.5rem] sm:text-[0.5625rem] md:text-[0.625rem] lg:text-[0.6875rem] xl:text-[0.75rem] font-medium uppercase tracking-widest leading-tight">
                      Patterned Long Sleeve Sweater
                    </p>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 lg:gap-3.5 xl:gap-4 mb-2 sm:mb-2.5 md:mb-3 lg:mb-3.5">
                    <div className="flex items-center gap-1.5 border border-stone-200 px-2 sm:px-2.5 md:px-3 lg:px-3.5 py-1 sm:py-1.25 md:py-1.5 rounded-[2px] text-[0.5rem] sm:text-[0.5625rem] md:text-[0.625rem] lg:text-[0.6875rem] xl:text-[0.75rem] font-bold text-stone-800">
                      4.3 <span className="text-green-600">★</span>
                    </div>
                    <span className="text-[0.5rem] sm:text-[0.5625rem] md:text-[0.625rem] lg:text-[0.6875rem] xl:text-[0.75rem] text-stone-400 font-bold uppercase tracking-wider">
                      2.4k Ratings
                    </span>
                  </div>

                  <div className="h-px bg-stone-100 w-full mb-2 sm:mb-2.5 md:mb-3 lg:mb-3.5"></div>

                  <div className="mb-2 sm:mb-2.5 md:mb-3 lg:mb-3.5 xl:mb-4">
                    <div className="flex items-baseline gap-2 sm:gap-2.5 md:gap-3 lg:gap-3.5 xl:gap-4 flex-wrap">
                      <span className="text-[0.875rem] sm:text-[1rem] md:text-[1.125rem] lg:text-[1.25rem] xl:text-[1.375rem] font-display text-stone-900 leading-tight">
                        ₹1,799
                      </span>
                      <span className="text-[0.5rem] sm:text-[0.5625rem] md:text-[0.625rem] lg:text-[0.6875rem] xl:text-[0.75rem] text-stone-400 line-through font-normal">
                        ₹3,499
                      </span>
                      <span className="text-[0.375rem] sm:text-[0.4375rem] md:text-[0.5rem] lg:text-[0.5625rem] xl:text-[0.625rem] text-orange-500 font-bold uppercase tracking-[0.15em]">
                        (49% OFF)
                      </span>
                    </div>
                    <p className="text-[0.375rem] sm:text-[0.4375rem] md:text-[0.5rem] lg:text-[0.5625rem] xl:text-[0.625rem] text-green-700 mt-1 sm:mt-1.25 md:mt-1.5 font-bold uppercase tracking-[0.15em] leading-tight">
                      inclusive of all taxes
                    </p>
                  </div>

                  <div className="mb-2 sm:mb-2.5 md:mb-3 lg:mb-3.5 xl:mb-4">
                    <div className="flex justify-between items-center mb-1.5 sm:mb-1.75 md:mb-2 lg:mb-2.25">
                      <span className="text-[0.5625rem] sm:text-[0.625rem] md:text-[0.6875rem] lg:text-[0.75rem] xl:text-[0.875rem] font-bold uppercase tracking-[0.15em] text-stone-900">
                        Select Size
                      </span>
                      <span className="text-[0.4375rem] sm:text-[0.5rem] md:text-[0.5625rem] lg:text-[0.625rem] xl:text-[0.6875rem] text-brand-pink font-bold cursor-pointer tracking-[0.15em] uppercase">
                        Size Chart &gt;
                      </span>
                    </div>
                    <div className="flex gap-2 sm:gap-2.5 md:gap-3 lg:gap-3.5 xl:gap-4">
                      <button className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 rounded-full border border-stone-300 text-[0.5rem] sm:text-[0.5625rem] md:text-[0.625rem] lg:text-[0.6875rem] xl:text-[0.75rem] font-bold text-stone-500 hover:border-brand-pink hover:text-brand-pink transition-colors">
                        S
                      </button>
                      <button className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 rounded-full border border-brand-pink text-[0.5rem] sm:text-[0.5625rem] md:text-[0.625rem] lg:text-[0.6875rem] xl:text-[0.75rem] font-bold text-black bg-white transition-colors">
                        M
                      </button>
                      <button className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 rounded-full border border-stone-300 text-[0.5rem] sm:text-[0.5625rem] md:text-[0.625rem] lg:text-[0.6875rem] xl:text-[0.75rem] font-bold text-stone-500 hover:border-brand-pink hover:text-brand-pink transition-colors">
                        L
                      </button>
                      <button className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 rounded-full border border-stone-300 text-[0.5rem] sm:text-[0.5625rem] md:text-[0.625rem] lg:text-[0.6875rem] xl:text-[0.75rem] font-bold text-stone-500 hover:border-brand-pink hover:text-brand-pink transition-colors">
                        XL
                      </button>
                    </div>
                  </div>
                </div>

                {/* Actions Area */}
                <div className="flex flex-col gap-2 sm:gap-2.5 md:gap-3 lg:gap-3.5 xl:gap-4 shrink-0 mt-auto pt-2 sm:pt-2.5 md:pt-3 lg:pt-3.5">
                  {/* Injected Button */}
                  <button
                    onClick={openPanel}
                    className={`w-full relative overflow-hidden bg-yellow-400 text-black px-2.5 sm:px-3 md:px-3.5 lg:px-4 xl:px-4.5 py-2 sm:py-2.25 md:py-2.5 lg:py-2.75 xl:py-3 rounded-[2px] shadow-md text-[0.5rem] sm:text-[0.5625rem] md:text-[0.625rem] lg:text-[0.6875rem] xl:text-[0.75rem] font-bold uppercase tracking-[0.15em] hover:bg-yellow-300 transition-all flex items-center justify-center gap-1.5 sm:gap-2 md:gap-2.25 lg:gap-2.5 group ring-2 ring-yellow-100 duration-300 ${
                      isPanelOpen
                        ? 'opacity-50 pointer-events-none grayscale'
                        : ''
                    }`}
                  >
                    <span className="bg-black text-white px-1.5 sm:px-1.75 md:px-2 lg:px-2.25 py-0.75 sm:py-1 md:py-1.25 text-[0.375rem] sm:text-[0.4375rem] md:text-[0.5rem] lg:text-[0.5625rem] rounded-sm font-bold">
                      LYO
                    </span>
                    <span className="relative z-10 flex items-center gap-1.25 sm:gap-1.5 md:gap-1.75 lg:gap-2">
                      Try On Now
                      <svg
                        className="w-3.25 h-3.25 sm:w-3.75 sm:h-3.75 md:w-4 md:h-4 lg:w-4.25 lg:h-4.25 xl:w-4.5 xl:h-4.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  </button>

                  {/* Myntra Style Buttons */}
                  <div className="flex gap-2 sm:gap-2.5 md:gap-3 lg:gap-3.5 xl:gap-4">
                    <button className="flex-1 bg-brand-pink text-white px-2.5 sm:px-3 md:px-3.5 lg:px-4 xl:px-4.5 py-2 sm:py-2.25 md:py-2.5 lg:py-2.75 xl:py-3 rounded-[2px] text-[0.5rem] sm:text-[0.5625rem] md:text-[0.625rem] lg:text-[0.6875rem] xl:text-[0.75rem] font-bold uppercase tracking-[0.15em] hover:bg-rose-600 transition-colors flex items-center justify-center gap-1.25 sm:gap-1.5 md:gap-1.75 lg:gap-2">
                      <svg
                        className="w-3.25 h-3.25 sm:w-3.75 sm:h-3.75 md:w-4 md:h-4 lg:w-4.25 lg:h-4.25 xl:w-4.5 xl:h-4.5 shrink-0"
                        fill="white"
                        viewBox="0 0 24 24"
                      >
                        <path d="M16 6v2h2l2 12H0L2 8h2V6a6 6 0 1112 0zm-2 0a4 4 0 10-8 0v2h8V6z" />
                      </svg>
                      <span className="whitespace-nowrap">Add to Bag</span>
                    </button>
                    <button className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-11 xl:h-11 border border-stone-300 rounded flex items-center justify-center text-stone-400 hover:border-stone-800 hover:text-stone-800 shrink-0">
                      <svg
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5 xl:w-5.5 xl:h-5.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. LYO SIDE PANEL */}
          <div
            className={`absolute top-0 right-0 w-full md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-[400px] h-full bg-white border-l border-stone-200 shadow-[-20px_0_40px_rgba(0,0,0,0.15)] panel-transition z-20 flex flex-col ${
              isPanelOpen ? 'panel-open' : 'panel-closed'
            }`}
          >
            {/* Close Button */}
            {!isLoading && (
              <button
                onClick={closePanel}
                className="absolute top-2 md:top-3 lg:top-3 xl:top-4 right-2 md:right-3 lg:right-3 xl:right-4 z-30 text-stone-400 hover:text-black text-lg md:text-xl lg:text-xl xl:text-2xl px-1 md:px-1.5 lg:px-1.5 xl:px-2 transition-colors"
                aria-label="Close panel"
              >
                ×
              </button>
            )}

            {/* Content */}
            <div className="flex-1 flex flex-col min-h-0 p-1.5 md:p-2 lg:p-2 xl:p-3 2xl:p-4 bg-white">
              {/* Image Container */}
              <div className="relative rounded overflow-hidden mb-1 md:mb-1.5 lg:mb-1.5 xl:mb-2 2xl:mb-2.5 group flex-3 min-h-0 max-h-[70%] lg:max-h-[60%] xl:max-h-[65%] 2xl:max-h-[70%] w-full flex items-center justify-center p-1 md:p-1.5 lg:p-1.5 xl:p-2">
                {/* Loading Animation */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 border-2 border-stone-200 border-t-brand-pink rounded-full animate-spin"></div>
                  </div>
                )}
                {/* Image */}
                {!isLoading && (
                  <img
                    src={getImageSrc()}
                    className="w-auto h-full max-w-full max-h-full object-contain"
                    alt="Try On Preview"
                  />
                )}
              </div>

              {/* Product Info & Controls */}
              <div className="shrink-0 space-y-0.5 md:space-y-1 lg:space-y-0.75 xl:space-y-1.5 2xl:space-y-2.5">
                {/* Product Name, Description & Price */}
                <div className="space-y-0.5 md:space-y-0.75 lg:space-y-0.5">
                  <div className="flex justify-between items-start gap-1 md:gap-1.5 lg:gap-1">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-stone-900 text-xs md:text-sm lg:text-xs xl:text-base 2xl:text-xl tracking-wide uppercase">
                        H&M
                      </h4>
                      <p className="text-stone-500 text-[0.35rem] md:text-[0.4rem] lg:text-[0.375rem] xl:text-[0.45rem] 2xl:text-[0.55rem] font-bold uppercase tracking-[0.2em] mt-0.5 line-clamp-1">
                        Patterned Long Sleeve Sweater
                      </p>
                    </div>
                    <div className="text-right ml-1 md:ml-1.5 lg:ml-1 xl:ml-1.5 2xl:ml-2 shrink-0">
                      <span className="font-display text-xs md:text-sm lg:text-xs xl:text-base 2xl:text-xl text-stone-900 block">
                        ₹1,799
                      </span>
                      <span className="text-stone-400 text-[0.4rem] md:text-[0.45rem] lg:text-[0.4rem] xl:text-[0.5rem] 2xl:text-[0.625rem] line-through">
                        ₹3,499
                      </span>
                      <span className="text-green-600 text-[0.4rem] md:text-[0.45rem] lg:text-[0.4rem] xl:text-[0.5rem] 2xl:text-[0.625rem] font-bold ml-0.5">
                        49% OFF
                      </span>
                    </div>
                  </div>
                </div>

                {/* Size Selector */}
                <div>
                  <div className="flex justify-between items-center mb-0.5 md:mb-0.75 lg:mb-0.5 xl:mb-0.75 2xl:mb-1">
                    <span className="text-[0.35rem] md:text-[0.4rem] lg:text-[0.375rem] xl:text-[0.45rem] 2xl:text-[0.55rem] font-bold text-stone-400 uppercase tracking-[0.2em]">
                      Select Size
                    </span>
                  </div>
                  <div className="flex gap-0.5 md:gap-0.75 lg:gap-0.5 xl:gap-1 2xl:gap-2 justify-start">
                    <button className="w-5 h-5 md:w-6 md:h-6 lg:w-5 lg:h-5 xl:w-7 xl:h-7 2xl:w-10 2xl:h-10 rounded-full border border-stone-300 text-[0.4rem] md:text-[0.45rem] lg:text-[0.4rem] xl:text-[0.5rem] 2xl:text-[0.625rem] font-bold text-stone-500 hover:border-brand-pink hover:text-brand-pink transition-colors shrink-0">
                      S
                    </button>
                    <button className="w-5 h-5 md:w-6 md:h-6 lg:w-5 lg:h-5 xl:w-7 xl:h-7 2xl:w-10 2xl:h-10 rounded-full border border-brand-pink text-black bg-white text-[0.4rem] md:text-[0.45rem] lg:text-[0.4rem] xl:text-[0.5rem] 2xl:text-[0.625rem] font-bold shrink-0">
                      M
                    </button>
                    <button className="w-5 h-5 md:w-6 md:h-6 lg:w-5 lg:h-5 xl:w-7 xl:h-7 2xl:w-10 2xl:h-10 rounded-full border border-stone-300 text-[0.4rem] md:text-[0.45rem] lg:text-[0.4rem] xl:text-[0.5rem] 2xl:text-[0.625rem] font-bold text-stone-500 hover:border-brand-pink hover:text-brand-pink transition-colors shrink-0">
                      L
                    </button>
                    <button className="w-5 h-5 md:w-6 md:h-6 lg:w-5 lg:h-5 xl:w-7 xl:h-7 2xl:w-10 2xl:h-10 rounded-full border border-stone-300 text-[0.4rem] md:text-[0.45rem] lg:text-[0.4rem] xl:text-[0.5rem] 2xl:text-[0.625rem] font-bold text-stone-500 hover:border-brand-pink hover:text-brand-pink transition-colors shrink-0">
                      XL
                    </button>
                  </div>
                </div>

                {/* History */}
                <div className="mt-0.5 lg:mt-0">
                  <span className="text-[0.35rem] md:text-[0.4rem] lg:text-[0.375rem] xl:text-[0.45rem] 2xl:text-[0.55rem] font-bold text-stone-400 uppercase tracking-[0.2em] block mb-0.5 md:mb-0.75 lg:mb-0.5 xl:mb-0.75 2xl:mb-1">
                    History
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
                          className={`shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-14 lg:h-14 xl:w-20 xl:h-20 2xl:w-28 2xl:h-28 rounded overflow-hidden transition-all duration-300 ease-out flex items-center justify-center ${
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
              </div>
            </div>

            <div className="p-1 md:p-1.5 lg:p-1.5 xl:p-2.5 2xl:p-3 border-t border-stone-100 bg-white shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
              {/* Add to Bag Button */}
              <button className="w-full py-1 md:py-1.5 lg:py-1.5 xl:py-2.5 2xl:py-3 text-[0.4rem] md:text-[0.45rem] lg:text-[0.45rem] xl:text-[0.55rem] 2xl:text-[0.625rem] font-bold tracking-[0.25em] uppercase transition-all flex items-center justify-center gap-1 md:gap-1.5 lg:gap-1.5 xl:gap-2 rounded bg-brand-pink text-white hover:bg-rose-600 shadow-lg hover:shadow-rose-200">
                <svg
                  className="w-3 h-3 md:w-3.5 md:h-3.5 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 2xl:w-4 2xl:h-4 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span className="whitespace-nowrap truncate">Add to Bag</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
