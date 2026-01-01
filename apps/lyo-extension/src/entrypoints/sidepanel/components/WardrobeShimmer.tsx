// Shimmer component for loading state - shows silhouette with opacity animation
// Used for:
// 1. Initial wardrobe loading
// 2. Pending generations (shows product image as silhouette)
// 3. Loading more wardrobe items

const DEFAULT_PLACEHOLDER =
  'https://tryonn.s3.ap-south-1.amazonaws.com/website/model-1-removebg-preview.png';

interface WardrobeItemShimmerProps {
  // Image URL to show as shimmer silhouette
  referencePhotoUrl?: string;
  // Alternative: use product image for generating items
  productImageUrl?: string;
  // Whether this is the first item (no negative margin)
  isFirst?: boolean;
}

export const WardrobeItemShimmer = ({
  referencePhotoUrl,
  productImageUrl,
  isFirst = false,
}: WardrobeItemShimmerProps) => {
  // Priority: productImageUrl > referencePhotoUrl > placeholder
  const imageUrl = productImageUrl || referencePhotoUrl || DEFAULT_PLACEHOLDER;

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
