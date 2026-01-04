import {
  useActiveTabProductStore,
  useCurrentSelectedWardrobeItemStore,
} from '@/entrypoints/sidepanel/stores';

export const DisplayWardrobeItem = () => {
  const { currentSelectedWardrobeItem } = useCurrentSelectedWardrobeItemStore();

  const isPending = currentSelectedWardrobeItem?.status === 'pending';
  const productImageUrl = useActiveTabProductStore((state) => state?.imageUrl);
  const isCompleted = currentSelectedWardrobeItem?.status === 'completed';

  if (isPending) {
    return (
      <div className="relative rounded overflow-hidden mb-3 flex-1 min-h-0 max-h-[75%] w-full flex items-center justify-center bg-stone-50">
        {/* Product image with reduced opacity */}
        <img
          src={productImageUrl}
          className="w-auto h-full max-w-full max-h-full object-cover opacity-40"
          alt="Product Image"
        />
        {/* Centered spinner overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-stone-200 border-t-brand-pink rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <img
        src={currentSelectedWardrobeItem?.signedUrl}
        className="w-auto h-full max-w-full max-h-full object-cover"
        alt="Wardrobe Item"
      />
    );
  }

  // If loading but no loading image, show spinner only when somethin goes wrong handle this later.
  return (
    <div className="relative rounded overflow-hidden mb-3 flex-1 min-h-0 max-h-[75%] w-full flex items-center justify-center bg-stone-50">
      <div className="w-10 h-10 border-2 border-stone-200 border-t-brand-pink rounded-full animate-spin" />
    </div>
  );
};
