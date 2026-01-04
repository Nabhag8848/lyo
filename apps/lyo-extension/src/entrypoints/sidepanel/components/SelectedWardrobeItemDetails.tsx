import {
  useActiveTabProductStore,
  useCurrentSelectedWardrobeItemStore,
} from '@/entrypoints/sidepanel/stores';

export const SelectedWardrobeItemDetails = () => {
  const { currentSelectedWardrobeItem } = useCurrentSelectedWardrobeItemStore();
  const activeTabProduct = useActiveTabProductStore();
  const garment = currentSelectedWardrobeItem?.garment;

  if (!garment) return null;

  const isCurrentProductPage =
    activeTabProduct?.sourceUrl === garment?.sourceUrl;

  const { garmentBrandName, garmentName } = garment;
  const { price, mrp, discount } = activeTabProduct ?? {};
  return (
    <div className="space-y-1.5 min-h-14">
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-display text-stone-900 text-base tracking-wide uppercase line-clamp-1">
            {garmentBrandName}
          </h4>
          <p className="text-stone-500 text-[0.5rem] font-bold uppercase tracking-[0.2em] mt-0.5 line-clamp-2 min-h-[2.4em]">
            {garmentName || '\u00A0'}
          </p>
        </div>
        {isCurrentProductPage && (
          <div className="text-right shrink-0">
            <span className="font-display text-base text-stone-900 block">
              {price}
            </span>
            {mrp && (
              <span className="text-stone-400 text-[0.625rem] line-through">
                {mrp}
              </span>
            )}
            {discount && (
              <span className="text-green-600 text-[0.625rem] font-bold ml-1">
                {discount}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
