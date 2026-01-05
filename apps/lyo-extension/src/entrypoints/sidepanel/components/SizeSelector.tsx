import {
  useActiveTabProductStore,
  useCurrentSelectedWardrobeItemStore,
} from '@/entrypoints/sidepanel/stores';
import { cn } from '@/entrypoints/sidepanel/utils/tailwind';

export const SizeSelector = () => {
  const activeTabProduct = useActiveTabProductStore();
  const { currentSelectedWardrobeItem } = useCurrentSelectedWardrobeItemStore();

  const isCurrentProductPage =
    activeTabProduct?.sourceUrl ===
    currentSelectedWardrobeItem?.garment?.sourceUrl;

  if (!isCurrentProductPage || activeTabProduct?.sizeOptions?.length === 0) {
    return null;
  }

  const sizeOptions = activeTabProduct?.sizeOptions ?? [];
  const selectedSize = activeTabProduct?.selectedSize ?? null;

  const handleSizeClick = async (size: string) => {
    await browser.runtime.sendMessage<
      { type: 'update_selected_size'; data: { size: string } },
      void
    >({
      type: 'update_selected_size',
      data: { size },
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[0.5rem] font-bold text-stone-400 uppercase tracking-[0.2em]">
          Select Size
        </span>
      </div>
      <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]">
        {sizeOptions.map((sizeOption: SizeOption) => {
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
              className={cn(
                'w-9 h-9 rounded-full border text-[0.625rem] font-bold transition-colors shrink-0',
                selectedSize === sizeOption.size
                  ? 'border-brand-pink text-black bg-white'
                  : sizeOption.available
                  ? 'border-stone-300 text-stone-500 hover:border-brand-pink hover:text-brand-pink'
                  : 'border-stone-200 text-stone-300 cursor-not-allowed opacity-50'
              )}
            >
              {displaySize}
            </button>
          );
        })}
      </div>
    </div>
  );
};
