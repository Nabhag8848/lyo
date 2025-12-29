import { useState, useEffect } from 'react';
import { useProduct } from './hooks/use-product';
import { useAccessToken } from './hooks/use-access-token';
import { useGenerateTryon } from './hooks/use-generate-tryon';
import { useSSEGeneration } from './hooks/use-sse-generation';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGeneration, setSelectedGeneration] = useState(0);

  const product = useProduct();
  const selectedSize = product?.selectedSize ?? null;
  const accessToken = useAccessToken();
  const {
    generate,
    isLoading: isGenerating,
    error: generateError,
  } = useGenerateTryon(accessToken);
  const {
    generations,
    isConnected,
    error: sseError,
    connect,
  } = useSSEGeneration();

  // Simulate loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

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

  const handleTryOn = async () => {
    if (!product?.imageUrl || !product?.sourceUrl) {
      console.error('Missing product data');
      return;
    }

    // Connect to SSE first
    connect();

    // Generate tryon
    await generate({
      garmentImageUrl: product.imageUrl,
      garmentSourceUrl: product.sourceUrl,
      brandName: product.brand,
      garmentBrandName: product.brand,
      garmentName: product.name,
      garmentDescription: product.name,
    });
  };

  const getDisplayImageSrc = () => {
    // Show generated image if selected, otherwise product image or fallback
    if (generations.length > 0 && selectedGeneration < generations.length) {
      return (
        generations[selectedGeneration].imageUrl ||
        product?.imageUrl ||
        'https://tryonn.s3.ap-south-1.amazonaws.com/website/model-1-removebg-preview.png'
      );
    }
    return (
      product?.imageUrl ||
      'https://tryonn.s3.ap-south-1.amazonaws.com/website/model-1-removebg-preview.png'
    );
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
      <div className="flex-1 flex flex-col min-h-0 p-4 bg-white">
        {/* Image Container */}
        <div className="relative rounded overflow-hidden mb-3 flex-1 min-h-0 max-h-[60%] w-full flex items-center justify-center">
          {/* Loading Animation - Initial Load */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-stone-50 z-20">
              <div className="w-10 h-10 border-2 border-stone-200 border-t-brand-pink rounded-full animate-spin"></div>
            </div>
          )}
          {/* Loading Animation - Generating or Waiting for SSE */}
          {!isLoading &&
            (isGenerating || (isConnected && generations.length === 0)) && (
              <div className="absolute inset-0 flex items-center justify-center bg-stone-50 z-20">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-2 border-stone-200 border-t-brand-pink rounded-full animate-spin"></div>
                  <p className="text-stone-600 text-xs font-medium">
                    {isGenerating ? 'Generating...' : 'Waiting for results...'}
                  </p>
                </div>
              </div>
            )}
          {/* Image */}
          {!isLoading &&
            !isGenerating &&
            !(isConnected && generations.length === 0) && (
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

          {/* Wardrobe Section - Show when there are generated images */}
          {generations.length > 0 && (
            <div className="mt-2">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[0.5rem] font-bold text-stone-400 uppercase tracking-[0.2em]">
                  Wardrobe
                </span>
                {!isConnected && (
                  <span className="text-[0.5rem] text-green-600 font-bold">
                    ✓ Complete
                  </span>
                )}
              </div>
              <style>{`
                .wardrobe-scroll::-webkit-scrollbar {
                  display: none;
                }
                .wardrobe-scroll {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `}</style>
              <div
                className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 wardrobe-scroll"
                style={{
                  scrollbarWidth: 'none',
                }}
              >
                {generations.map((gen, index) => (
                  <button
                    key={gen.id || index}
                    onClick={() => setSelectedGeneration(index)}
                    className={`shrink-0 w-14 h-14 rounded overflow-hidden border-2 transition-all ${
                      selectedGeneration === index
                        ? 'border-brand-pink opacity-100 scale-105'
                        : 'border-stone-200 opacity-60 hover:opacity-80 hover:border-brand-pink'
                    }`}
                  >
                    <img
                      src={gen.imageUrl}
                      alt={`Try-on ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error Messages */}
          {(generateError || sseError) && (
            <div className="mt-2 bg-red-50 border border-red-200 rounded-lg p-2">
              <p className="text-red-800 text-[0.625rem]">
                {generateError || sseError}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="p-3 border-t border-stone-100 bg-white shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] space-y-2">
        {/* Try On Button */}
        <button
          onClick={handleTryOn}
          disabled={
            !accessToken ||
            !product?.imageUrl ||
            isGenerating ||
            (isConnected && generations.length === 0)
          }
          className={`w-full py-2.5 text-[0.625rem] font-bold tracking-[0.25em] uppercase transition-all flex justify-center items-center gap-1.5 rounded ${
            !accessToken ||
            !product?.imageUrl ||
            isGenerating ||
            (isConnected && generations.length === 0)
              ? 'bg-stone-300 text-stone-500 cursor-not-allowed shadow-none'
              : 'bg-brand-pink text-white hover:bg-rose-600 shadow-lg hover:shadow-rose-200'
          }`}
        >
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
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          {!accessToken
            ? 'Login Required'
            : isGenerating || (isConnected && generations.length === 0)
            ? 'Generating...'
            : 'Try On'}
        </button>

        {/* Debug Info - Remove in production */}
        {(!accessToken || !product?.imageUrl) && (
          <div className="text-[0.5rem] text-stone-400 text-center">
            {!accessToken && (
              <div>⚠️ No access token (login to lyo.fashion)</div>
            )}
            {!product?.imageUrl && <div>⚠️ No product image</div>}
          </div>
        )}

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

export default App;
