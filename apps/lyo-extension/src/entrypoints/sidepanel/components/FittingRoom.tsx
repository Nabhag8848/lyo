import { useActiveTabProductStore } from '@/entrypoints/sidepanel/stores';
import { Wardrobe } from './Wardrobe';
import { DisplayWardrobeItem } from './DisplayWardrobeItem';
import { SelectedWardrobeItemDetails } from './SelectedWardrobeItemDetails';

export const FittingRoom = () => {
  useActiveTabProductStore();
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Content */}
      <div className="flex-1 flex flex-col min-h-0 p-4 pb-0 bg-white">
        <DisplayWardrobeItem />
        {/* Product Info & Controls */}
        <div className="shrink-0 space-y-2 overflow-y-auto overflow-x-hidden min-h-0">
          <SelectedWardrobeItemDetails />
          <Wardrobe />
        </div>
      </div>
    </div>
  );
};
