import { useState, useEffect } from 'react';

function App() {
  const [selectedColor, setSelectedColor] = useState('bg-yellow-400');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const getImageSrc = (color: string) => {
    if (color === 'bg-stone-900') {
      return '/user-model-black.png';
    }
    if (color === 'bg-stone-400') {
      return '/user-model-grey.png';
    }
    if (color === 'bg-yellow-400') {
      return '/user-model.png';
    }
    return '/user-model.png';
  };

  return (
    <div className="flex flex-col h-screen bg-stone-50">
      {/* Header */}
      <div className="h-16 border-b border-stone-200 flex items-center justify-between px-8 shrink-0 bg-white">
        <div className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-wide text-black">
            LYO.
          </span>
          <span className="text-[9px] bg-black text-white px-2 py-1 rounded-full font-bold tracking-widest">
            BETA
          </span>
        </div>
        <button
          onClick={() => {
            window.close();
          }}
          className="text-stone-400 hover:text-black text-2xl px-2 transition-colors"
        >
          ×
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-8 bg-stone-50 overflow-hidden">
        {/* Image Container */}
        <div className="flex-1 relative bg-stone-100 rounded shadow-sm overflow-hidden mb-6 group border border-stone-200">
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
                src={getImageSrc(selectedColor)}
                className="w-full h-full object-cover"
                alt="Virtual Try On"
                onError={(e) => {
                  // Fallback if image doesn't load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Live Render Badge */}
          <div className="absolute top-4 left-4 bg-green-500/90 backdrop-blur text-white px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] rounded-sm shadow-sm flex items-center gap-2 z-30">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
            Live Render
          </div>

          {/* Match Badge */}
          {!isLoading && (
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-2 rounded border border-stone-200 shadow-sm z-30">
              <div className="text-[10px] font-bold text-green-600 tracking-widest">
                94% MATCH
              </div>
            </div>
          )}
        </div>

        {/* Product Info & Controls */}
        <div className="shrink-0 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-display text-stone-900 text-2xl tracking-wide uppercase">
                Product Name
              </h4>
              <p className="text-stone-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
                Product Description
              </p>
            </div>
            <span className="font-display text-2xl text-stone-900">₹0</span>
          </div>

          <div className="flex justify-between items-end">
            {/* Size */}
            <div>
              <span className="text-[9px] font-bold text-stone-400 uppercase tracking-[0.2em] block mb-2">
                Size
              </span>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full border border-stone-200 text-xs font-bold text-stone-400 hover:border-black hover:text-black transition-colors">
                  S
                </button>
                <button className="w-10 h-10 rounded-full border border-black bg-black text-white text-xs font-bold shadow-md">
                  M
                </button>
                <button className="w-10 h-10 rounded-full border border-stone-200 text-xs font-bold text-stone-400 hover:border-black hover:text-black transition-colors">
                  L
                </button>
              </div>
            </div>

            {/* Color */}
            <div>
              <span className="text-[9px] font-bold text-stone-400 uppercase tracking-[0.2em] block mb-2 text-right">
                Color
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedColor('bg-yellow-400')}
                  className={`w-8 h-8 rounded-full bg-yellow-400 shadow-sm ring-1 ring-stone-200 ring-offset-2 transition-transform ${
                    selectedColor === 'bg-yellow-400'
                      ? 'ring-2 ring-black scale-110'
                      : 'hover:scale-110'
                  }`}
                ></button>
                <button
                  onClick={() => setSelectedColor('bg-stone-400')}
                  className={`w-8 h-8 rounded-full bg-[#d6d3cd] shadow-sm ring-1 ring-stone-200 ring-offset-2 transition-transform ${
                    selectedColor === 'bg-stone-400'
                      ? 'ring-2 ring-black scale-110'
                      : 'hover:scale-110'
                  }`}
                ></button>
                <button
                  onClick={() => setSelectedColor('bg-stone-900')}
                  className={`w-8 h-8 rounded-full bg-stone-900 shadow-sm ring-1 ring-stone-200 ring-offset-2 transition-transform ${
                    selectedColor === 'bg-stone-900'
                      ? 'ring-2 ring-black scale-110'
                      : 'hover:scale-110'
                  }`}
                ></button>
              </div>
            </div>
          </div>

          <div className="bg-stone-50 p-5 rounded border border-stone-200">
            <p className="text-xs leading-relaxed text-stone-600 font-medium">
              <span className="font-bold text-black uppercase tracking-widest text-[9px] mr-1">
                Fit Check:
              </span>
              Virtual try-on powered by LYO. See how this product looks on you
              before you buy.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="p-6 border-t border-stone-200 bg-white shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <button className="w-full py-4 bg-brand-pink text-white text-xs font-bold tracking-[0.25em] uppercase hover:bg-rose-600 transition-all shadow-lg hover:shadow-rose-200 flex justify-between px-8 rounded-[2px]">
          <span className="uppercase">ADD TO BAG</span>
          <span>₹0</span>
        </button>
      </div>
    </div>
  );
}

export default App;
