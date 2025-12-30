interface DisplayGeneratedImageProps {
  imageUrl: string;
  alt: string;
  isLoading: boolean;
}

export function DisplayGeneratedImage({
  imageUrl,
  alt,
  isLoading,
}: DisplayGeneratedImageProps) {
  return (
    <div className="relative rounded overflow-hidden mb-3 flex-1 min-h-0 max-h-[75%] w-full flex items-center justify-center">
      {/* Loading Animation - Initial Load */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-50 z-20">
          <div className="w-10 h-10 border-2 border-stone-200 border-t-brand-pink rounded-full animate-spin"></div>
        </div>
      )}
      {/* Image */}
      {!isLoading && (
        <img
          src={imageUrl}
          className="w-auto h-full max-w-full max-h-full object-cover"
          alt={alt}
        />
      )}
    </div>
  );
}
