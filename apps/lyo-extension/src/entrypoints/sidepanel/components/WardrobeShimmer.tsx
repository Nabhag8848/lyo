// Shimmer component for loading state - shows reference photo with opacity animation
export const WardrobeItemShimmer = ({
  referencePhotoUrl,
  isFirst = false,
}: {
  referencePhotoUrl?: string;
  isFirst?: boolean;
}) => {
  // Use reference photo if available, otherwise use a placeholder
  const imageUrl =
    referencePhotoUrl ||
    'https://tryonn.s3.ap-south-1.amazonaws.com/website/model-1-removebg-preview.png';

  return (
    <div
      className={`shrink-0 w-16 h-28 rounded overflow-hidden flex items-center justify-center ${
        isFirst ? '' : '-ml-4'
      }`}
    >
      <img
        src={imageUrl}
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
