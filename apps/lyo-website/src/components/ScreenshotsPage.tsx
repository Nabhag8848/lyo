import React from 'react';

// Different wardrobe images like in the website
const wardrobeImages = [
  'https://tryonn.s3.ap-south-1.amazonaws.com/website/model-1-removebg-preview.png',
  'https://tryonn.s3.ap-south-1.amazonaws.com/website/model-6-removebg-preview.png',
  'https://tryonn.s3.ap-south-1.amazonaws.com/website/model-4-removebg-preview.png',
  'https://tryonn.s3.ap-south-1.amazonaws.com/website/model-2-removebg-preview.png',
  'https://tryonn.s3.ap-south-1.amazonaws.com/website/model-3-removebg-preview.png',
  'https://tryonn.s3.ap-south-1.amazonaws.com/website/model.png',
];

const ScreenshotCard = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <div className="mb-12">
    <div className="w-[1280px] h-[800px] bg-white border-2 border-stone-200 rounded-lg overflow-hidden shadow-xl flex items-center justify-center">
      {children}
    </div>
  </div>
);

export const ScreenshotsPage = () => {
  return (
    <div className="min-h-screen bg-stone-100 py-12 px-6 flex flex-col items-center">
      {/* Screenshot 1: Upload Photo & Avatar Generation */}
      <ScreenshotCard
        title="Upload Your Photo Once"
        description="Upload your full-body photo to generate multiple avatars for virtual try-on"
      >
        <div className="w-full h-full bg-stone-100 flex items-center justify-center p-8">
          {/* Laptop Screen Frame */}
          {/* Screen Content */}
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="bg-store-100 border-b border-stone-200 px-6 lg:px-8 py-4 lg:py-6 shrink-0">
              <h2 className="font-display text-xl lg:text-2xl text-stone-900 uppercase tracking-wide mb-2">
                Create Your Avatar
              </h2>
              <p className="text-stone-500 text-xs lg:text-sm font-bold uppercase tracking-[0.2em]">
                Upload your photo to generate lookalike avatars
              </p>
            </div>

            {/* Content - Dashboard Layout */}
            <div className="flex-1 flex flex-col lg:flex-row gap-4 lg:gap-8 p-4 lg:p-6 min-h-0 overflow-hidden">
              {/* Left Side - Main Reference Photo Display */}
              <div className="flex-1 lg:flex-[0.5] flex items-center justify-center min-w-0 min-h-0 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center border border-stone-200 lg:border-stone-300 rounded-lg lg:rounded-xl bg-transparent">
                  <img
                    src="https://tryonn.s3.ap-south-1.amazonaws.com/website/model.png"
                    alt=""
                    className="max-w-full max-h-full w-auto h-auto object-contain"
                  />
                </div>
              </div>

              {/* Right Side - Horizontal Scroll Wardrobe */}
              <div className="flex-none lg:flex-[0.5] flex flex-col min-w-0 lg:min-h-0 overflow-hidden">
                <div className="flex flex-col lg:h-full lg:min-h-0 lg:items-center lg:justify-center w-full">
                  {/* Reference Photo Selector - Horizontal Scroll */}
                  <div className="flex items-center justify-center py-2 lg:py-4 w-full">
                    <div className="w-full min-h-[120px] lg:min-h-[200px]">
                      {/* Horizontal Scroll Container */}
                      <div
                        className="flex overflow-x-auto scroll-smooth py-2 lg:py-4"
                        style={{
                          scrollbarWidth: 'none',
                          msOverflowStyle: 'none',
                          WebkitOverflowScrolling: 'touch',
                        }}
                      >
                        {/* Left padding */}
                        <div className="shrink-0 w-[calc(50%-4rem)]" />

                        {/* Avatar Items - Mix of generating (shimmer) and complete */}
                        {[
                          { generating: true, idx: 0 },
                          { generating: true, idx: 1 },
                          { generating: false, idx: 2 },
                          { generating: true, idx: 3 },
                          { generating: true, idx: 4 },
                          { generating: true, idx: 5 },
                          { generating: true, idx: 6 },
                          { generating: true, idx: 7 },
                        ].map((item, index) => {
                          const isSelected = index === 2;
                          const scale = isSelected ? 1.05 : 1;
                          const opacity = isSelected ? 1 : 0.6;

                          return (
                            <div
                              key={index}
                              className={`shrink-0 w-20 h-24 sm:w-24 sm:h-32 md:w-32 md:h-40 lg:w-40 lg:h-52 rounded-lg overflow-hidden transition-all duration-300 ease-out flex items-center justify-center ${
                                index === 0
                                  ? ''
                                  : '-ml-3 sm:-ml-4 md:-ml-6 lg:-ml-8'
                              }`}
                              style={{
                                transform: `scale(${scale})`,
                                opacity,
                                zIndex: isSelected ? 10 : 1,
                              }}
                            >
                              {item.generating ? (
                                <img
                                  src="https://tryonn.s3.ap-south-1.amazonaws.com/website/model.png"
                                  alt="Generating"
                                  className="max-w-full max-h-full object-contain"
                                  style={{
                                    filter: 'brightness(0)',
                                    mixBlendMode: 'normal',
                                  }}
                                />
                              ) : (
                                <img
                                  src={
                                    'https://tryonn.s3.ap-south-1.amazonaws.com/website/model.png'
                                  }
                                  alt={`Avatar ${item.idx + 1}`}
                                  className="max-w-full max-h-full object-contain"
                                />
                              )}
                            </div>
                          );
                        })}

                        {/* Right padding */}
                        <div className="shrink-0 w-[calc(50%-4rem)]" />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-row gap-2 sm:gap-3 pt-2 sm:pt-3 border-t border-stone-200 shrink-0 w-full lg:justify-center">
                    <button className="flex-1 px-4 py-2 lg:px-6 lg:py-3 border border-stone-200 text-stone-700 hover:bg-stone-100 transition-colors text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase whitespace-nowrap">
                      Upload Different Photo
                    </button>
                    <button className="flex-1 bg-black text-white px-4 py-2 lg:px-6 lg:py-3 text-[9px] sm:text-[10px] font-bold tracking-[0.15em] hover:bg-stone-800 transition-all shadow-xl uppercase flex items-center justify-center gap-2 group whitespace-nowrap">
                      Use This Avatar
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScreenshotCard>

      {/* Screenshot 2: Try-On Button Opens Sidepanel with Loading */}
      <ScreenshotCard
        title="Instant Try-On While Shopping"
        description="Click Try On to see how clothes look on you - generation happens instantly"
      >
        <div className="w-full h-full bg-white flex relative">
          {/* Myntra Product Page (Left Side) */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Browser Header */}
            <div className="bg-stone-50 border-b border-stone-200 px-4 py-2 flex items-center gap-2 shrink-0">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-stone-300"></div>
                <div className="w-2 h-2 rounded-full bg-stone-300"></div>
              </div>
              <div className="flex-1 bg-white h-6 rounded border border-stone-200 text-xs flex items-center px-3 text-stone-500 font-bold">
                <span role="img" aria-label="Secure">
                  🔒
                </span>{' '}
                MYNTRA.COM/MEN/TOPS
              </div>
            </div>

            {/* Product Content */}
            <div className="flex-1 flex min-h-0">
              {/* Product Image */}
              <div className="w-[58%] bg-stone-100 flex items-end">
                <img
                  src="https://tryonn.s3.ap-south-1.amazonaws.com/website/new.png"
                  className="w-full h-full object-cover"
                  alt="Product"
                />
              </div>

              {/* Product Details */}
              <div className="w-[42%] p-8 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-xl text-stone-900 mb-1 uppercase tracking-wide">
                    H&M
                  </h3>
                  <p className="text-stone-500 text-xs font-bold uppercase tracking-wider mb-4">
                    Patterned Sleeve Sweater
                  </p>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1.5 border border-stone-200 px-3 py-1 rounded text-xs font-bold text-stone-800">
                      4.3 <span className="text-green-600">★</span>
                    </div>
                    <span className="text-xs text-stone-400 font-bold uppercase tracking-wider">
                      2.4k Ratings
                    </span>
                  </div>

                  <div className="h-px bg-stone-100 w-full mb-4"></div>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="text-xl font-display text-stone-900">
                        ₹1,799
                      </span>
                      <span className="text-xs text-stone-400 line-through">
                        ₹3,499
                      </span>
                      <span className="text-xs text-orange-500 font-bold uppercase tracking-wider">
                        (49% OFF)
                      </span>
                    </div>
                    <p className="text-xs text-green-700 font-bold uppercase tracking-wider">
                      inclusive of all taxes
                    </p>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold uppercase tracking-wider text-stone-900">
                        Select Size
                      </span>
                      <span className="text-xs text-brand-pink font-bold cursor-pointer tracking-wider uppercase">
                        Size Chart &gt;
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {['S', 'M', 'L', 'XL'].map((size, idx) => (
                        <button
                          key={size}
                          className={`w-9 h-9 rounded-full border text-xs font-bold ${
                            idx === 1
                              ? 'border-brand-pink text-black bg-white'
                              : 'border-stone-300 text-stone-500'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* LYO Button - Disabled/Processing State */}
                <div className="space-y-2">
                  <button className="w-full bg-yellow-400 text-black px-4 py-2.5 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 opacity-50 cursor-not-allowed">
                    <span className="bg-black text-white px-2 py-1 text-xs rounded font-bold">
                      LYO
                    </span>
                    <span>Try On Now</span>
                  </button>

                  <button className="w-full bg-brand-pink text-white px-4 py-2.5 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
                      <path d="M16 6v2h2l2 12H0L2 8h2V6a6 6 0 1112 0zm-2 0a4 4 0 10-8 0v2h8V6z" />
                    </svg>
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* LYO Sidepanel (Right Side) - Loading State */}
          <div className="w-[400px] h-full bg-white border-l border-stone-200 shadow-[-20px_0_40px_rgba(0,0,0,0.15)] flex flex-col">
            <div className="flex-1 flex flex-col min-h-0 p-4 pb-0 bg-white">
              {/* Display Area - Loading State */}
              <div className="relative rounded overflow-hidden mb-3 flex-1 min-h-0 w-full flex items-center justify-center bg-stone-50">
                {/* Product image with reduced opacity */}
                <img
                  src="https://tryonn.s3.ap-south-1.amazonaws.com/website/new.png"
                  className="w-auto h-full max-w-full max-h-full object-cover opacity-40"
                  alt="Product"
                />
                {/* Centered spinner overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 border-2 border-stone-200 border-t-brand-pink rounded-full"></div>
                </div>
              </div>

              {/* Product Info */}
              <div className="shrink-0 space-y-2">
                <div className="space-y-1.5 min-h-14">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-stone-900 text-base tracking-wide uppercase line-clamp-1">
                        H&M
                      </h4>
                      <p className="text-stone-500 text-[0.5rem] font-bold uppercase tracking-[0.2em] mt-0.5 line-clamp-2 min-h-[2.4em]">
                        Patterned Sleeve Sweater
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-display text-base text-stone-900 block">
                        ₹1,799
                      </span>
                      <span className="text-stone-400 text-[0.625rem] line-through">
                        ₹3,499
                      </span>
                      <span className="text-green-600 text-[0.625rem] font-bold ml-1">
                        49% OFF
                      </span>
                    </div>
                  </div>
                </div>

                {/* Size Selector */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[0.5rem] font-bold text-stone-400 uppercase tracking-[0.2em]">
                      Select Size
                    </span>
                  </div>
                  <div className="flex gap-1.5 overflow-x-auto pb-1">
                    {['S', 'M', 'L', 'XL'].map((size, idx) => (
                      <button
                        key={size}
                        className={`w-9 h-9 rounded-full border text-[0.625rem] font-bold shrink-0 ${
                          idx === 1
                            ? 'border-brand-pink text-black bg-white'
                            : 'border-stone-300 text-stone-500'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Wardrobe - Loading Items */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[0.5rem] font-bold text-stone-400 uppercase tracking-[0.2em]">
                      WARDROBE
                    </span>
                  </div>
                  <div
                    className="flex overflow-x-auto pb-1 -mx-2 px-2"
                    style={{ scrollbarWidth: 'none' }}
                  >
                    <div className="shrink-0 w-[calc(50%-1rem)]" />
                    {/* First item is the one being generated */}
                    <div className="shrink-0 w-16 h-28 rounded overflow-hidden flex items-center justify-center">
                      <img
                        src="https://tryonn.s3.ap-south-1.amazonaws.com/website/model.png"
                        alt="Loading..."
                        className="max-w-full max-h-full object-contain"
                        style={{
                          filter: 'brightness(0)',
                          mixBlendMode: 'normal',
                        }}
                      />
                    </div>
                    {/* Other items from wardrobe */}
                    {wardrobeImages.slice(1, 5).map((img, idx) => (
                      <div
                        key={idx}
                        className={`shrink-0 w-16 h-28 rounded overflow-hidden transition-all duration-300 flex items-center justify-center opacity-60 z-1 -ml-4`}
                      >
                        <img
                          src={img}
                          alt={`Wardrobe item ${idx + 1}`}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    ))}
                    <div className="shrink-0 w-[calc(50%-1rem)]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button - Disabled during loading */}
            <div className="p-3 border-t border-stone-100 bg-white shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
              <button
                disabled
                className="w-full py-2.5 text-[0.625rem] font-bold tracking-[0.25em] uppercase bg-stone-300 text-stone-500 cursor-not-allowed shadow-none flex justify-between px-4 rounded"
              >
                <span className="flex items-center gap-1.5">
                  <svg className="w-3 h-3" fill="white" viewBox="0 0 24 24">
                    <path d="M16 6v2h2l2 12H0L2 8h2V6a6 6 0 1112 0zm-2 0a4 4 0 10-8 0v2h8V6z" />
                  </svg>
                  Add to Bag
                </span>
              </button>
            </div>
          </div>
        </div>
      </ScreenshotCard>

      {/* Screenshot 3: Try-On Generated */}
      <ScreenshotCard
        title="See Your Perfect Fit"
        description="Try-on generated! Browse your wardrobe and make confident purchase decisions"
      >
        <div className="w-full h-full bg-white flex relative">
          {/* Myntra Product Page (Left Side) */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Browser Header */}
            <div className="bg-stone-50 border-b border-stone-200 px-4 py-2 flex items-center gap-2 shrink-0">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-stone-300"></div>
                <div className="w-2 h-2 rounded-full bg-stone-300"></div>
              </div>
              <div className="flex-1 bg-white h-6 rounded border border-stone-200 text-xs flex items-center px-3 text-stone-500 font-bold">
                <span role="img" aria-label="Secure">
                  🔒
                </span>{' '}
                MYNTRA.COM/MEN/TOPS
              </div>
            </div>

            {/* Product Content */}
            <div className="flex-1 flex min-h-0">
              {/* Product Image */}
              <div className="w-[58%] bg-stone-100 flex items-end">
                <img
                  src="https://tryonn.s3.ap-south-1.amazonaws.com/website/new.png"
                  className="w-full h-full object-cover"
                  alt="Product"
                />
              </div>

              {/* Product Details */}
              <div className="w-[42%] p-8 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-xl text-stone-900 mb-1 uppercase tracking-wide">
                    H&M
                  </h3>
                  <p className="text-stone-500 text-xs font-bold uppercase tracking-wider mb-4">
                    Patterned Sleeve Sweater
                  </p>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1.5 border border-stone-200 px-3 py-1 rounded text-xs font-bold text-stone-800">
                      4.3 <span className="text-green-600">★</span>
                    </div>
                    <span className="text-xs text-stone-400 font-bold uppercase tracking-wider">
                      2.4k Ratings
                    </span>
                  </div>

                  <div className="h-px bg-stone-100 w-full mb-4"></div>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="text-xl font-display text-stone-900">
                        ₹1,799
                      </span>
                      <span className="text-xs text-stone-400 line-through">
                        ₹3,499
                      </span>
                      <span className="text-xs text-orange-500 font-bold uppercase tracking-wider">
                        (49% OFF)
                      </span>
                    </div>
                    <p className="text-xs text-green-700 font-bold uppercase tracking-wider">
                      inclusive of all taxes
                    </p>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold uppercase tracking-wider text-stone-900">
                        Select Size
                      </span>
                      <span className="text-xs text-brand-pink font-bold cursor-pointer tracking-wider uppercase">
                        Size Chart &gt;
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {['S', 'M', 'L', 'XL'].map((size, idx) => (
                        <button
                          key={size}
                          className={`w-9 h-9 rounded-full border text-xs font-bold ${
                            idx === 1
                              ? 'border-brand-pink text-black bg-white'
                              : 'border-stone-300 text-stone-500'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* LYO Button */}
                <div className="space-y-2">
                  <button className="w-full bg-yellow-400 text-black px-4 py-2.5 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                    <span className="bg-black text-white px-2 py-1 text-xs rounded font-bold">
                      LYO
                    </span>
                    <span>Try On Now</span>
                    <svg
                      className="w-4 h-4"
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
                  </button>

                  <button className="w-full bg-brand-pink text-white px-4 py-2.5 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
                      <path d="M16 6v2h2l2 12H0L2 8h2V6a6 6 0 1112 0zm-2 0a4 4 0 10-8 0v2h8V6z" />
                    </svg>
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* LYO Sidepanel (Right Side) - Completed Try-On */}
          <div className="w-[400px] h-full bg-white border-l border-stone-200 shadow-[-20px_0_40px_rgba(0,0,0,0.15)] flex flex-col">
            <div className="flex-1 flex flex-col min-h-0 p-4 pb-0 bg-white">
              {/* Display Area - Completed Try-On */}
              <div className="relative rounded overflow-hidden mb-3 flex-1 min-h-0 w-full flex items-center justify-center bg-stone-50">
                <img
                  src="https://tryonn.s3.ap-south-1.amazonaws.com/website/model-1-removebg-preview.png"
                  className="w-auto h-full max-w-full max-h-full object-contain"
                  alt="Try-on result"
                />
              </div>

              {/* Product Info */}
              <div className="shrink-0 space-y-2">
                <div className="space-y-1.5 min-h-14">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-stone-900 text-base tracking-wide uppercase line-clamp-1">
                        H&M
                      </h4>
                      <p className="text-stone-500 text-[0.5rem] font-bold uppercase tracking-[0.2em] mt-0.5 line-clamp-2 min-h-[2.4em]">
                        Patterned Sleeve Sweater
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-display text-base text-stone-900 block">
                        ₹1,799
                      </span>
                      <span className="text-stone-400 text-[0.625rem] line-through">
                        ₹3,499
                      </span>
                      <span className="text-green-600 text-[0.625rem] font-bold ml-1">
                        49% OFF
                      </span>
                    </div>
                  </div>
                </div>

                {/* Size Selector */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[0.5rem] font-bold text-stone-400 uppercase tracking-[0.2em]">
                      Select Size
                    </span>
                  </div>
                  <div className="flex gap-1.5 overflow-x-auto pb-1">
                    {['S', 'M', 'L', 'XL'].map((size, idx) => (
                      <button
                        key={size}
                        className={`w-9 h-9 rounded-full border text-[0.625rem] font-bold shrink-0 ${
                          idx === 1
                            ? 'border-brand-pink text-black bg-white'
                            : 'border-stone-300 text-stone-500'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Wardrobe - Multiple Items */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[0.5rem] font-bold text-stone-400 uppercase tracking-[0.2em]">
                      WARDROBE
                    </span>
                  </div>
                  <div
                    className="flex overflow-x-auto pb-1 -mx-2 px-2"
                    style={{ scrollbarWidth: 'none' }}
                  >
                    <div className="shrink-0 w-[calc(50%-1rem)]" />
                    {wardrobeImages.map((img, idx) => (
                      <button
                        key={idx}
                        className={`shrink-0 w-16 h-28 rounded overflow-hidden transition-all duration-300 flex items-center justify-center ${
                          idx === 0 ? 'opacity-100 z-10' : 'opacity-60 z-1'
                        } ${idx === 0 ? '' : '-ml-4'}`}
                      >
                        <img
                          src={img}
                          alt={`Wardrobe item ${idx + 1}`}
                          className="max-w-full max-h-full object-contain"
                        />
                      </button>
                    ))}
                    <div className="shrink-0 w-[calc(50%-1rem)]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="p-3 border-t border-stone-100 bg-white shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
              <button className="w-full py-2.5 text-[0.625rem] font-bold tracking-[0.25em] uppercase bg-brand-pink text-white hover:bg-rose-600 shadow-lg flex justify-between px-4 rounded">
                <span className="flex items-center gap-1.5">
                  <svg className="w-3 h-3" fill="white" viewBox="0 0 24 24">
                    <path d="M16 6v2h2l2 12H0L2 8h2V6a6 6 0 1112 0zm-2 0a4 4 0 10-8 0v2h8V6z" />
                  </svg>
                  Add to Bag
                </span>
                <span className="text-[0.625rem]">₹1,799</span>
              </button>
            </div>
          </div>
        </div>
      </ScreenshotCard>
    </div>
  );
};
