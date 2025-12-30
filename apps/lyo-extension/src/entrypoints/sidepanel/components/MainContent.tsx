import { useState } from 'react';
import { useProduct } from '../hooks/use-product';

export function MainContent() {
  const [isLoading] = useState(false);
  const product = useProduct();
  const selectedSize = product?.selectedSize ?? null;

  const displayPrice = product?.price || '₹1,499';
  const displayMrp = product?.mrp || '';
  const displayDiscount = product?.discount || '';
  const displayBrand = product?.brand || 'H&M';
  const displayName = product?.name || 'Sculpt Tube Top';
  const buttonType = product?.buttonType || 'add_to_bag';
  const buttonText = buttonType === 'go_to_bag' ? 'Go to Bag' : 'Add to Bag';
  const sizes = product?.sizes || [];

  // Determine if button should be disabled
  // - "Go to Bag" is always enabled (item already in bag)
  // - "Add to Bag" is only enabled if size is selected (or if no sizes exist)
  const isButtonDisabled =
    buttonType === 'add_to_bag' && sizes.length > 0 && selectedSize === null;

  const handleSizeClick = async (size: string) => {
    await browser.runtime.sendMessage({
      type: 'selectSize',
      size,
    });
  };

  const getDisplayImageSrc = () => {
    return (
      product?.imageUrl ||
      'https://tryonn.s3.ap-south-1.amazonaws.com/website/model-1-removebg-preview.png'
    );
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Content */}
      <div className="flex-1 flex flex-col min-h-0 p-4 bg-white">
        {/* Image Container */}
        <div className="relative rounded overflow-hidden mb-3 flex-1 min-h-0 max-h-[60%] w-full flex items-center justify-center">
          {/* Loading Animation - Initial Load */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-stone-50 z-20">
              <div className="w-10 h-10 border-2 border-stone-200 border-t-brand-pink rounded-full animate-spin"></div>
            </div>
          )}
          {/* Image */}
          {!isLoading && (
            <img
              src={getDisplayImageSrc()}
              className="w-auto h-full max-w-full max-h-full object-contain"
              alt={displayName}
            />
          )}
        </div>

        {/* Product Info & Controls */}
        <div className="shrink-0 space-y-2 overflow-y-auto min-h-0">
          {/* Product Name, Description & Price */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1 min-w-0">
                <h4 className="font-display text-stone-900 text-base tracking-wide uppercase">
                  {displayBrand}
                </h4>
                <p className="text-stone-500 text-[0.5rem] font-bold uppercase tracking-[0.2em] mt-0.5 line-clamp-2">
                  {displayName}
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="font-display text-base text-stone-900 block">
                  {displayPrice}
                </span>
                {displayMrp && (
                  <span className="text-stone-400 text-[0.625rem] line-through">
                    {displayMrp}
                  </span>
                )}
                {displayDiscount && (
                  <span className="text-green-600 text-[0.625rem] font-bold ml-1">
                    {displayDiscount}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Size Selector */}
          {sizes.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[0.5rem] font-bold text-stone-400 uppercase tracking-[0.2em]">
                  Select Size
                </span>
              </div>
              <style>{`
                .size-scroll::-webkit-scrollbar {
                  display: none;
                }
                .size-scroll {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `}</style>
              <div
                className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 size-scroll"
                style={{
                  scrollbarWidth: 'none',
                }}
              >
                {sizes.map((sizeOption: SizeOption) => {
                  // Extract just the size part (e.g., "M" from "M Rs. 799")
                  const displaySize = sizeOption.size.split(/\s+/)[0];

                  return (
                    <button
                      key={sizeOption.size}
                      onClick={() => {
                        if (sizeOption.available) {
                          handleSizeClick(sizeOption.size);
                        }
                      }}
                      disabled={!sizeOption.available}
                      className={`w-9 h-9 rounded-full border text-[0.625rem] font-bold transition-colors shrink-0 ${
                        selectedSize === sizeOption.size
                          ? 'border-brand-pink text-black bg-white'
                          : sizeOption.available
                          ? 'border-stone-300 text-stone-500 hover:border-brand-pink hover:text-brand-pink'
                          : 'border-stone-200 text-stone-300 cursor-not-allowed opacity-50'
                      }`}
                    >
                      {displaySize}
                    </button>
                  );
                })}
              </div>
              {sizes.some((s) => !s.available) && (
                <p className="text-[0.5rem] text-stone-400 mt-1">
                  * Some sizes may not be available
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="p-3 border-t border-stone-100 bg-white shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] space-y-2">
        {/* Add to Bag Button */}
        <button
          onClick={async () => {
            if (!isButtonDisabled) {
              await browser.runtime.sendMessage({
                type: 'clickAddToBag',
                buttonType,
              });
            }
          }}
          disabled={isButtonDisabled}
          className={`w-full py-2.5 text-[0.625rem] font-bold tracking-[0.25em] uppercase transition-all flex justify-between px-4 rounded ${
            isButtonDisabled
              ? 'bg-stone-300 text-stone-500 cursor-not-allowed shadow-none'
              : 'bg-brand-pink text-white hover:bg-rose-600 shadow-lg hover:shadow-rose-200'
          }`}
        >
          <span className="flex items-center gap-1.5">
            {buttonType === 'add_to_bag' && (
              <svg
                className="w-3 h-3"
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
            )}
            {buttonText}
          </span>
          {buttonType === 'add_to_bag' && !isButtonDisabled && (
            <span className="text-[0.625rem]">{displayPrice}</span>
          )}
          {buttonType === 'go_to_bag' && (
            <svg
              className="w-3 h-3"
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
          )}
        </button>
      </div>
    </div>
  );
}
