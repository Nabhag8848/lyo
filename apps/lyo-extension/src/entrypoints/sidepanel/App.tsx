import { useState, useEffect } from 'react';
import type { Product, SizeOption } from '@/lib/messaging';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Load product data from storage when component mounts
  useEffect(() => {
    browser.storage.session
      .get('current_product_view')
      .then(({ current_product_view: data }) => {
        if (data) {
          setProduct(data);
          setSelectedSize(data.selectedSize || null);
        }
      });

    // Also listen for storage changes
    const listener = (
      changes: Record<string, { newValue?: unknown; oldValue?: unknown }>
    ) => {
      if (
        changes.current_product_view &&
        changes.current_product_view.newValue
      ) {
        const newData = changes.current_product_view.newValue as Product;
        setProduct(newData);
        setSelectedSize(newData.selectedSize || null);
      }
    };

    browser.storage.onChanged.addListener(listener);

    return () => {
      browser.storage.onChanged.removeListener(listener);
    };
  }, []);

  // Simulate loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const getImageSrc = () => {
    // Use product image if available, otherwise fallback
    return (
      product?.imageUrl ||
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400'
    );
  };

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

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header
      <div className="h-16 border-b border-stone-100 flex items-center justify-between px-8 shrink-0 bg-stone-50">
        <div className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-wide text-black">
            LYO.
          </span>
          <span className="text-[9px] bg-black text-white px-2 py-1 rounded-full font-bold tracking-widest">
            BETA
          </span>
        </div>
      </div> */}

      {/* Content */}
      <style>{`
        .content-scroll::-webkit-scrollbar {
          width: 3px;
        }
        .content-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .content-scroll::-webkit-scrollbar-thumb {
          background: rgba(214, 211, 209, 0.4);
          border-radius: 2px;
          min-height: 20px;
        }
        .content-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(214, 211, 209, 0.7);
        }
        .content-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(214, 211, 209, 0.4) transparent;
        }
      `}</style>
      <div
        className="flex-1 flex flex-col p-8 pb-0 bg-white overflow-y-auto min-h-0 content-scroll"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(214, 211, 209, 0.4) transparent',
        }}
      >
        {/* Image Container */}
        <div className="relative bg-stone-100 rounded overflow-hidden mb-6 group h-[450px] w-full shrink-0">
          {/* Loading Animation */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-stone-50 z-20">
              <div className="w-10 h-10 border-2 border-stone-200 border-t-brand-pink rounded-full animate-spin"></div>
            </div>
          )}
          {/* Image */}
          {!isLoading && (
            <div className="absolute inset-0 z-10">
              <img
                src={getImageSrc()}
                className="w-full h-full object-cover"
                alt={displayName}
              />
            </div>
          )}
        </div>

        {/* Product Info & Controls */}
        <div className="shrink-0 space-y-6">
          {/* Product Name, Description & Price */}
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-display text-stone-900 text-2xl tracking-wide uppercase">
                  {displayBrand}
                </h4>
                <p className="text-stone-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1 line-clamp-2">
                  {displayName}
                </p>
              </div>
              <div className="text-right ml-4">
                <span className="font-display text-2xl text-stone-900 block">
                  {displayPrice}
                </span>
                {displayMrp && (
                  <span className="text-stone-400 text-xs line-through">
                    {displayMrp}
                  </span>
                )}
                {displayDiscount && (
                  <span className="text-green-600 text-xs font-bold ml-2">
                    {displayDiscount}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Size Selector */}
          {sizes.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[9px] font-bold text-stone-400 uppercase tracking-[0.2em]">
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
                className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 size-scroll"
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
                      className={`w-12 h-12 rounded-full border text-xs font-bold transition-colors shrink-0 ${
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
                <p className="text-[9px] text-stone-400 mt-2">
                  * Some sizes may not be available
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="p-6 border-t border-stone-100 bg-white shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
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
          className={`w-full py-4 text-xs font-bold tracking-[0.25em] uppercase transition-all flex justify-between px-8 rounded ${
            isButtonDisabled
              ? 'bg-stone-300 text-stone-500 cursor-not-allowed shadow-none'
              : 'bg-brand-pink text-white hover:bg-rose-600 shadow-lg hover:shadow-rose-200'
          }`}
        >
          <span className="flex items-center gap-2">
            {buttonType === 'add_to_bag' && (
              <svg
                className="w-4 h-4"
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
            <span>{displayPrice}</span>
          )}
          {buttonType === 'go_to_bag' && (
            <svg
              className="w-4 h-4"
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

export default App;
