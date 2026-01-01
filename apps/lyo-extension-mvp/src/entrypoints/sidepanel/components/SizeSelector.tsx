interface SizeSelectorProps {
  sizes: SizeOption[];
  selectedSize: string | null;
  onSizeClick: (size: string) => void;
}

export function SizeSelector({
  sizes,
  selectedSize,
  onSizeClick,
}: SizeSelectorProps) {
  if (sizes.length === 0) {
    return null;
  }

  return (
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
                  onSizeClick(sizeOption.size);
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
  );
}
