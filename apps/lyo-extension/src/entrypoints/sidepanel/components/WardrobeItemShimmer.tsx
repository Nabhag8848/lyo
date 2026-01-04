import { useReferencePhotoStore } from '@/entrypoints/sidepanel/stores';

export const WardrobeItemShimmer = ({
  isFirst = false,
}: {
  isFirst?: boolean;
}) => {
  const { referencePhoto } = useReferencePhotoStore();
  const referencePhotoUrl = referencePhoto?.url;
  return (
    <div
      className={`shrink-0 w-16 h-28 rounded overflow-hidden flex items-center justify-center ${
        isFirst ? '' : '-ml-4'
      }`}
    >
      <img
        src={referencePhotoUrl}
        alt="Loading..."
        className="max-w-full max-h-full object-contain shimmer-opacity"
        style={{
          filter: 'brightness(0)',
          mixBlendMode: 'normal',
        }}
      />
    </div>
  );
};
