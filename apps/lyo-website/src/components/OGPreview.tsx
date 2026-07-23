export const OGPreview = () => {
  const modelImages = [
    '/website/model-1-removebg-preview.png',
    '/website/model-5-removebg-preview.png',
    '/website/model-7-removebg-preview.png',
    '/website/model-4-removebg-preview.png',
    '/website/model-6-removebg-preview.png',
    '/website/model-2-removebg-preview.png',
    '/website/model-3-removebg-preview.png',
    '/website/model-8-removebg-preview.png',
  ];

  return (
    <div className="w-[1200px] h-[630px] bg-white flex items-center justify-center relative overflow-hidden">
      {/* Background gradient similar to your site */}
      <div className="absolute inset-0 bg-linear-to-b from-stone-50 to-white" />

      {/* Models on the left */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-end justify-center gap-0 -space-x-2 h-full">
        {modelImages.slice(0, 4).map((src, index) => (
          <img
            key={`left-${index}`}
            src={src}
            alt={`Model ${index + 1}`}
            className="h-[500px] w-auto object-contain"
          />
        ))}
      </div>

      {/* Models on the right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-end justify-center gap-0 -space-x-2 h-full">
        {modelImages.slice(4, 8).map((src, index) => (
          <img
            key={`right-${index}`}
            src={src}
            alt={`Model ${index + 5}`}
            className="h-[500px] w-auto object-contain"
          />
        ))}
      </div>
    </div>
  );
};
