import { useActiveTabProductStore } from '@/entrypoints/sidepanel/stores';
import { Wardrobe } from './Wardrobe';
import { DisplayWardrobeItem } from './DisplayWardrobeItem';

export const FittingRoom = () => {
  useActiveTabProductStore();
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Content */}
      <div className="flex-1 flex flex-col min-h-0 p-4 pb-0 bg-white">
        <DisplayWardrobeItem />
        <Wardrobe />
      </div>
    </div>
  );
};
