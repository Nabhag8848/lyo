interface DisplayGeneratedImageProps {
  imageUrl: string;
  alt: string;
  isLoading: boolean;
  loadingImageUrl?: string; // Product image to show while generating
}

export function DisplayGeneratedImage({
  imageUrl,
  alt,
  isLoading,
  loadingImageUrl,
}: DisplayGeneratedImageProps) {
  // If loading and we have a loading image URL, show the product image with overlay
  if (isLoading && loadingImageUrl) {
    return (
      <div className="relative rounded overflow-hidden mb-3 flex-1 min-h-0 max-h-[75%] w-full flex items-center justify-center bg-stone-50">
        {/* Product image with reduced opacity */}
        <img
          src={loadingImageUrl}
          className="w-auto h-full max-w-full max-h-full object-cover opacity-40"
          alt="Generating..."
        />
        {/* Centered spinner overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-stone-200 border-t-brand-pink rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  // If loading but no loading image, show spinner only
  if (isLoading) {
    return (
      <div className="relative rounded overflow-hidden mb-3 flex-1 min-h-0 max-h-[75%] w-full flex items-center justify-center bg-stone-50">
        <div className="w-10 h-10 border-2 border-stone-200 border-t-brand-pink rounded-full animate-spin" />
      </div>
    );
  }

  // Normal state - show the generated/wardrobe image
  return (
    <div className="relative rounded overflow-hidden mb-3 flex-1 min-h-0 max-h-[75%] w-full flex items-center justify-center">
      {imageUrl ? (
        <img
          src={imageUrl}
          className="w-auto h-full max-w-full max-h-full object-cover"
          alt={alt}
        />
      ) : (
        <div className="flex items-center justify-center h-full text-stone-400 text-sm">
          No image available
        </div>
      )}
    </div>
  );
}
