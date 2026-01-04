import {
  useActiveTabProductStore,
  useCurrentSelectedWardrobeItemStore,
} from '@/entrypoints/sidepanel/stores';
import { cn } from '@/entrypoints/sidepanel/utils/tailwind';

export const ActionButtons = () => {
  const { currentSelectedWardrobeItem } = useCurrentSelectedWardrobeItemStore();
  const activeTabProduct = useActiveTabProductStore();
  const { price } = activeTabProduct ?? {};
  const isCurrentProductPage =
    activeTabProduct?.sourceUrl ===
    currentSelectedWardrobeItem?.garment?.sourceUrl;
  const isDisabled = isCurrentProductPage && activeTabProduct?.selectedSize === null;
  const buttonType = activeTabProduct?.buttonType;
  const buttonText = buttonType === 'go_to_bag' ? 'Go to Bag' : 'Add to Bag';
  const buttonTextGoToBag = 'Go to Bag';
  const isCurrentProductPageAddToBag =
    isCurrentProductPage && buttonType === 'add_to_bag';

  return (
    <div className="p-3 border-t border-stone-100 bg-white shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] space-y-2">
      <button
        disabled={isDisabled}
        className={cn(
          'w-full py-2.5 text-[0.625rem] font-bold tracking-[0.25em] uppercase transition-all flex justify-between px-4 rounded',
          isDisabled
            ? 'bg-stone-300 text-stone-500 cursor-not-allowed shadow-none'
            : 'bg-brand-pink text-white hover:bg-rose-600 shadow-lg hover:shadow-rose-200'
        )}
      >
        <span className="flex items-center gap-1.5">
          {isCurrentProductPageAddToBag && (
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
          {isCurrentProductPage ? buttonText : buttonTextGoToBag}
        </span>
        {isCurrentProductPageAddToBag && !isDisabled && (
          <span className="text-[0.625rem]">{price}</span>
        )}
        {(buttonType === 'go_to_bag' || !isCurrentProductPage) && (
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
  );
};
