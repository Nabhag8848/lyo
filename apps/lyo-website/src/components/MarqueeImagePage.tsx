export const MarqueeImagePage = () => {
  return (
    <div className="min-h-screen bg-stone-100 py-12 px-6 flex flex-col items-center justify-center">
      <div className="w-[1400px] h-[560px] bg-white rounded-lg overflow-hidden shadow-2xl relative flex items-center border border-stone-200">
        {/* Background Pattern - Subtle */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-50 via-white to-stone-50"></div>

        {/* Left Side - Text Content */}
        <div className="flex-1 px-20 relative z-10">
          <div className="max-w-2xl">
            {/* Logo/Brand */}
            <div className="mb-8 flex items-center gap-4">
              <span className="font-display text-5xl tracking-wide font-normal text-black">
                LYO.
              </span>
              <div className="h-10 w-px bg-stone-200"></div>
              <span className="text-stone-400 text-xs font-bold uppercase tracking-[0.2em]">
                Virtual Fitting Room
              </span>
            </div>

            {/* Main Headline - Simple & Bold */}
            <h1 className="font-display text-6xl text-black uppercase tracking-wide mb-6 leading-tight">
              Try On Clothes
              <br />
              <span className="text-brand-pink">While You Shop</span>
            </h1>

            {/* Simple Tagline */}
            <p className="text-stone-600 text-lg font-light mb-8 leading-relaxed">
              See how clothes look on you instantly. Upload your photo once, try
              on everything.
            </p>

            {/* Simple CTA Badge */}
            <div className="inline-flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-full px-6 py-3">
              <div className="w-2 h-2 rounded-full bg-brand-pink"></div>
              <span className="text-stone-600 text-sm font-bold uppercase tracking-[0.15em]">
                Currently Works on Myntra
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Visual: Product + Sidepanel Concept */}
        <div className="flex-1 px-20 relative z-10 flex items-center justify-center h-full">
          <div className="relative w-full max-w-2xl h-[400px]">
            {/* Browser Window Mockup - Product Page */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-stone-200 h-full">
              {/* Browser Header */}
              <div className="bg-stone-50 px-4 py-2 flex items-center gap-2 border-b border-stone-200 shrink-0">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-stone-300"></div>
                  <div className="w-2 h-2 rounded-full bg-stone-300"></div>
                </div>
                <div className="flex-1 bg-white h-5 rounded border border-stone-200 text-[10px] flex items-center px-2 text-stone-500 font-bold">
                  MYNTRA.COM
                </div>
              </div>

              {/* Product View */}
              <div className="flex flex-1 min-h-0 h-[35vh]">
                <div className="w-[30%] bg-stone-50 flex items-center justify-center overflow-hidden">
                  <img
                    src="/website/new.png"
                    className="w-full h-full object-cover scale-100"
                    alt="Product"
                  />
                </div>
                <div className="w-[40%] p-3 flex flex-col justify-between bg-white min-h-0">
                  <div className="space-y-2">
                    {/* Product Title */}
                    <div className="h-3 bg-stone-800 rounded w-3/4"></div>
                    <div className="h-2 bg-stone-300 rounded w-1/2"></div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="h-2.5 bg-stone-200 rounded w-12"></div>
                      <div className="h-2 bg-stone-300 rounded w-16"></div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-stone-100 w-full my-2"></div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <div className="h-3 bg-stone-800 rounded w-16"></div>
                      <div className="h-2 bg-stone-300 rounded w-12"></div>
                      <div className="h-2 bg-orange-200 rounded w-14"></div>
                    </div>

                    {/* Size Selector */}
                    <div className="mt-3">
                      <div className="h-2 bg-stone-300 rounded w-20 mb-2"></div>
                      <div className="flex gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-stone-200"></div>
                        <div className="w-6 h-6 rounded-full bg-stone-800"></div>
                        <div className="w-6 h-6 rounded-full bg-stone-200"></div>
                        <div className="w-6 h-6 rounded-full bg-stone-200"></div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-400 text-black px-3 py-2.5 mb-10 rounded-[2px] shadow-md ring-2 ring-yellow-100 text-[9px] font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-1.5 shrink-0">
                    <span className="bg-black text-white px-1.5 py-0.5 text-[8px] rounded-sm font-bold">
                      LYO
                    </span>
                    <span className="flex items-center gap-1">
                      TRY NOW
                      <svg
                        className="w-2.5 h-2.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidepanel Overlay - Coming from Right */}
            <div className="absolute top-0 right-0 w-56 h-full bg-white rounded-lg shadow-xl border-l-2 border-stone-200 flex flex-col overflow-hidden transform translate-x-6">
              {/* Sidepanel Content */}
              <div className="flex-1 p-3 flex flex-col min-h-0">
                <div className="flex-1 bg-stone-50 rounded mb-2 flex items-center justify-center overflow-hidden min-h-0">
                  <img
                    src="/website/model-1-removebg-preview.png"
                    className="w-full h-full object-contain"
                    alt="Try-on result"
                  />
                </div>
                <div className="h-2 bg-stone-800 rounded w-3/4 mb-1 shrink-0"></div>
                <div className="h-2 bg-stone-300 rounded w-1/2 shrink-0"></div>
              </div>
              <div className="p-2 border-t border-stone-100 bg-white shrink-0">
                <div className="h-5 bg-brand-pink rounded"></div>
              </div>
            </div>

            {/* Arrow Indicator */}
            <div className="absolute top-1/2 right-28 transform -translate-y-1/2 text-stone-400 z-20">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Accent - Brand Pink */}
      </div>
    </div>
  );
};
