import { useActiveTabProductStore } from '@/entrypoints/sidepanel/stores';
import { Wardrobe } from './Wardrobe';
import { DisplayWardrobeItem } from './DisplayWardrobeItem';
import { SelectedWardrobeItemDetails } from './SelectedWardrobeItemDetails';
import { ActionButtons } from './ActionButtons';
import { useReferencePhoto } from '@/entrypoints/sidepanel/hooks/use-reference-photo';
import { SizeSelector } from './SizeSelector';

export const FittingRoom = () => {
  useActiveTabProductStore();
  const { isLoading } = useReferencePhoto();

  // have the loader which we already have
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="w-10 h-10 border-2 border-stone-200 border-t-brand-pink rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Content */}
      <div className="flex-1 flex flex-col min-h-0 p-4 pb-0 bg-white">
        <DisplayWardrobeItem />
        {/* Product Info & Controls */}
        <div className="shrink-0 space-y-2 overflow-y-auto overflow-x-hidden min-h-0">
          <SelectedWardrobeItemDetails />
          <SizeSelector />
          <Wardrobe />
        </div>
      </div>
      <ActionButtons />
    </div>
  );
};
