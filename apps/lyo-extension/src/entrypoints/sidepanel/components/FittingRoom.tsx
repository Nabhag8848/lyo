import { useWardrobeStore } from '@/entrypoints/sidepanel/stores';
import { useWardrobe } from '@/entrypoints/sidepanel/hooks';

export const FittingRoom = () => {
  const { isLoading, error, loadMoreWardrobeItems, hasMoreWardrobeItems } =
    useWardrobe();
  const wardrobe = useWardrobeStore((state) => state.wardrobe);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <pre>{JSON.stringify(wardrobe, null, 2)}</pre>
      <button onClick={loadMoreWardrobeItems} disabled={!hasMoreWardrobeItems}>
        Load More
      </button>
    </div>
  );
};
