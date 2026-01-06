export const PromoTilePage = () => {
  return (
    <div className="min-h-screen bg-stone-100 py-6 px-6 flex flex-col items-center justify-center">
      <div className="w-[440px] h-[280px] bg-white rounded-lg overflow-hidden shadow-2xl relative flex items-center border border-stone-200">
        {/* Background - Subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-white to-stone-50"></div>

        {/* Content */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
          {/* Logo/Brand */}
          <div className="mb-1.5 flex items-center justify-center">
            <span className="font-display text-xl tracking-wide font-normal text-black">
              LYO.
            </span>
          </div>

          {/* Main Headline - Simple & Bold */}
          <h2 className="font-display text-base text-black uppercase tracking-wide mb-2 leading-tight text-center whitespace-nowrap">
            Try On Clothes{' '}
            <span className="text-brand-pink">While You Shop</span>
          </h2>

          {/* Visual Element - Product to Try-On Transformation - Large */}
          <div className="flex items-center justify-center gap-2.5 mt-1">
            {/* Product Image */}
            <div className="w-36 h-48 bg-stone-50 rounded border border-stone-200 overflow-hidden flex items-center justify-center shadow-md">
              <img
                src="https://tryonn.s3.ap-south-1.amazonaws.com/website/new.png"
                className="w-full h-full object-cover opacity-80"
                alt="Product"
              />
            </div>
            {/* Arrow */}
            <div>
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
            {/* Try-On Result */}
            <div className="w-36 h-48 bg-stone-50 rounded border border-stone-200 overflow-hidden flex items-center justify-center shadow-md">
              <img
                src="https://tryonn.s3.ap-south-1.amazonaws.com/website/model-1-removebg-preview.png"
                className="w-full h-full object-contain"
                alt="Try-on result"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
