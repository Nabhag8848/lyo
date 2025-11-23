import { useState, useEffect } from 'react';
import type { ProductData } from '@/lib/messaging';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [productData, setProductData] = useState<ProductData | null>(null);

  // Load product data from storage when component mounts
  useEffect(() => {
    browser.storage.local.get('productData').then(({ productData: data }) => {
      if (data) {
        setProductData(data);
      } else {
        console.warn('LYO Side Panel: No product data found in storage');
      }
    });

    // Also listen for storage changes
    const listener = (
      changes: Record<string, { newValue?: unknown; oldValue?: unknown }>
    ) => {
      if (changes.productData && changes.productData.newValue) {
        setProductData(changes.productData.newValue as ProductData);
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
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const getImageSrc = () => {
    // Use product image if available, otherwise fallback
    return (
      productData?.imageUrl ||
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400'
    );
  };

  const displayPrice = productData?.price || '₹1,499';
  const displayMrp = productData?.mrp || '';
  const displayDiscount = productData?.discount || '';
  const displayBrand = productData?.brand || 'H&M';
  const displayName = productData?.name || 'Sculpt Tube Top';
  const displayDescription =
    productData?.description ||
    'A modern, form-fitting tube top with sculpted design. Perfect for layering or wearing solo. Made with premium stretch fabric for ultimate comfort and style.';

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="h-16 border-b border-stone-100 flex items-center justify-between px-8 shrink-0 bg-stone-50">
        <div className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-wide text-black">
            LYO.
          </span>
          <span className="text-[9px] bg-black text-white px-2 py-1 rounded-full font-bold tracking-widest">
            BETA
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-8 bg-white overflow-hidden">
        {/* Image Container */}
        <div className="flex-1 relative bg-stone-100 rounded shadow-sm overflow-hidden mb-6 group border border-stone-200 min-h-[300px]">
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
            {/* Product Description */}
            {displayDescription && (
              <div className="bg-stone-50 p-4 rounded border border-stone-200">
                <p className="text-xs leading-relaxed text-stone-600 font-medium">
                  {displayDescription}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-stone-100 bg-white shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <button className="w-full py-4 bg-brand-pink text-white text-xs font-bold tracking-[0.25em] uppercase hover:bg-rose-600 transition-all shadow-lg hover:shadow-rose-200 flex justify-between px-8 rounded">
          <span>Add to Bag</span>
          <span>{displayPrice}</span>
        </button>
      </div>
    </div>
  );
}

export default App;
