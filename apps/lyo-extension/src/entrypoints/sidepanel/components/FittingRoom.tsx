import { useActiveTabProductStore } from '@/entrypoints/sidepanel/stores';
import { Wardrobe } from './Wardrobe';

export const FittingRoom = () => {
  useActiveTabProductStore();
  return (
    <div>
      <Wardrobe />
    </div>
  );
};
