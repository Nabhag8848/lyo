import {
  useActiveTabProductStore,
  useReferencePhotoStore,
  useWardrobeStore,
} from '@/entrypoints/sidepanel/stores';
import { useWardrobe } from '@/entrypoints/sidepanel/hooks';
import { useReferencePhoto } from '@/entrypoints/sidepanel/hooks';

export const FittingRoom = () => {
  const activeProduct = useActiveTabProductStore();
  useReferencePhoto();
  const referencePhoto = useReferencePhotoStore(
    (state) => state.referencePhoto
  );
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
      <pre>{JSON.stringify(activeProduct, null, 2)}</pre>
      <pre>{JSON.stringify(referencePhoto, null, 2)}</pre>
      <pre>{JSON.stringify(wardrobe, null, 2)}</pre>
      <button onClick={loadMoreWardrobeItems} disabled={!hasMoreWardrobeItems}>
        Load More
      </button>
    </div>
  );
};
