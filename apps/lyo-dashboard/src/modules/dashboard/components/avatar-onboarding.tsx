import { useState, useRef } from 'react';
import { AvatarSelector } from './avatar-selector';

interface Avatar {
  id: string;
  url: string;
}

export const AvatarOnboarding = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [selectedAvatarId, setSelectedAvatarId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setUploadedImage(imageUrl);
        // Reset avatars and selection when new image is uploaded
        setAvatars([]);
        setSelectedAvatarId(null);
        // TODO: Call backend API to generate avatars
        // For now, we'll simulate with placeholder avatars
        generateAvatars(imageUrl);
      };
      reader.readAsDataURL(file);
    }
    // Reset the input value so the same file can be selected again if needed
    // Only reset if a file was actually selected
    if (file) {
      event.target.value = '';
    }
  };

  const generateAvatars = async (imageUrl: string) => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      // Mock avatars - replace with actual API call
      const mockAvatars: Avatar[] = Array.from({ length: 8 }, (_, i) => ({
        id: `avatar-${i + 1}`,
        url: imageUrl, // In real implementation, this would be the generated avatar URL
      }));
      setAvatars(mockAvatars);
      // Auto-select first avatar
      if (mockAvatars.length > 0) {
        setSelectedAvatarId(mockAvatars[0].id);
      }
      setIsGenerating(false);
    }, 2000);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSelectAvatar = (avatarId: string) => {
    setSelectedAvatarId(avatarId);
  };

  // Get the selected avatar URL or default to first avatar
  const getDisplayAvatarUrl = () => {
    if (selectedAvatarId) {
      const selected = avatars.find((a) => a.id === selectedAvatarId);
      return selected?.url || uploadedImage;
    }
    return uploadedImage;
  };

  const handleUseAvatar = () => {
    if (selectedAvatarId) {
      // TODO: Call backend API to save selected avatar
      console.log('Selected avatar:', selectedAvatarId);
    }
  };

  return (
    <div className="flex-1 bg-stone-50 text-stone-900 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* File input - always available for both upload states */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <h1 className="font-display text-3xl lg:text-4xl leading-[1.1] text-black mb-2 uppercase tracking-wide">
          Create Your Avatar
        </h1>
        <p className="text-base text-stone-600 mb-8 font-light">
          Upload your photo to generate lookalike avatars
        </p>

        {!uploadedImage ? (
          <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-stone-200 rounded-xl bg-white shadow-sm">
            <div className="mb-5">
              <svg
                className="w-16 h-16 text-stone-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <button
              onClick={handleUploadClick}
              className="bg-black text-white px-10 py-4 text-xs font-bold tracking-[0.2em] hover:bg-stone-800 transition-all shadow-xl hover:-translate-y-1 duration-300 uppercase mb-3"
            >
              Upload Photo
            </button>
            <p className="text-[11px] font-bold tracking-[0.2em] text-stone-500 uppercase">
              JPG, PNG or HEIC up to 10MB
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Main Avatar Display - Changes based on selection */}
            <div className="flex justify-center mb-6">
              <div className="w-[300px] h-[380px] rounded-xl overflow-hidden  flex items-center justify-center">
                <img
                  src={getDisplayAvatarUrl()}
                  alt="Selected Avatar"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>

            {/* Avatar Selector */}
            {avatars.length > 0 && (
              <div className="mb-6">
                <AvatarSelector
                  avatars={avatars}
                  selectedAvatarId={selectedAvatarId || undefined}
                  onSelectAvatar={handleSelectAvatar}
                  isLoading={isGenerating}
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={handleUploadClick}
                className="px-10 py-4 border border-stone-200 text-stone-700 hover:bg-stone-100 hover:border-stone-300 transition-colors text-xs font-bold tracking-[0.2em] uppercase"
              >
                Upload Different Photo
              </button>
              {selectedAvatarId && (
                <button
                  onClick={handleUseAvatar}
                  className="bg-black text-white px-10 py-4 text-xs font-bold tracking-[0.2em] hover:bg-stone-800 transition-all shadow-xl hover:-translate-y-1 duration-300 uppercase flex items-center gap-3 group"
                >
                  Use This Avatar
                  <span className="group-hover:translate-x-1 transition-transform text-lg">
                    →
                  </span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
