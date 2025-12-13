import { useState, useRef, useEffect } from 'react';
import { AvatarSelector } from './avatar-selector';
import { useUploadAvatar } from '@/modules/onboarding/hooks/use-upload-avatar';
import { useAvatar } from '@/modules/onboarding/hooks/use-avatar';
import { useDeleteAvatar } from '@/modules/onboarding/hooks/use-delete-avatar';

export const AvatarOnboarding = () => {
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [selectedAvatarId, setSelectedAvatarId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadAvatar } = useUploadAvatar();
  const { data: alreadyUploadedAvatar, isLoading: isLoadingAvatar } =
    useAvatar();
  const { mutate: deleteAvatar, isPending: isDeletingAvatar } =
    useDeleteAvatar();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadAvatar(file);
    }
    if (file) {
      event.target.value = '';
    }
  };

  useEffect(() => {
    if (alreadyUploadedAvatar) {
      generateAvatars(alreadyUploadedAvatar.url ?? '');
    }
  }, [alreadyUploadedAvatar]);

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
      return selected?.url;
    }
    return alreadyUploadedAvatar?.url;
  };

  const handleUseAvatar = () => {
    if (selectedAvatarId) {
      // TODO: Call backend API to save selected avatar
    }
  };

  const handleDeleteAvatar = () => {
    deleteAvatar(undefined, {
      onSuccess: () => {
        setAvatars([]);
        setSelectedAvatarId(null);
      },
    });
  };

  return (
    <div className="bg-stone-50 text-stone-900 h-full flex flex-col">
      <div className="mx-auto px-6 py-6 max-w-auto ml-10 mr-10 flex-1 flex flex-col min-h-0">
        {/* File input - always available for both upload states */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <h1 className="font-display text-3xl lg:text-4xl leading-[1.1] text-black mb-2 uppercase tracking-wide shrink-0">
          Create Your Avatar
        </h1>
        <p className="text-base text-stone-600 mb-6 font-light shrink-0">
          Upload your photo to generate lookalike avatars
        </p>

        {isLoadingAvatar ? (
          <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-stone-200 rounded-xl bg-white shadow-sm">
            <div className="mb-5">
              <div className="w-16 h-16 border-2 border-stone-300 border-t-stone-600 rounded-full animate-spin mx-auto" />
            </div>
            <p className="text-[11px] font-bold tracking-[0.2em] text-stone-500 uppercase">
              Loading avatar...
            </p>
          </div>
        ) : !alreadyUploadedAvatar ? (
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
          <div className="flex gap-8 flex-1 min-h-0">
            {/* Left Side - Main Avatar Display */}
            <div className="flex-[0.4] flex items-center justify-center min-w-0 min-h-0">
              <div className="w-full h-full flex items-center justify-center p-6">
                <img
                  src={getDisplayAvatarUrl() || ''}
                  alt="Selected Avatar"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Right Side - Scrollable Avatars and Buttons */}
            <div className="flex-[0.6] flex flex-col min-w-0 min-h-0">
              {isGenerating ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-600 rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-[11px] font-bold tracking-[0.2em] text-stone-500 uppercase">
                      Generating avatars...
                    </p>
                  </div>
                </div>
              ) : avatars.length > 0 ? (
                <>
                  {/* Avatar Selector */}
                  <div className="flex-1"></div>
                  <div className="shrink-0 mb-2" style={{ maxHeight: '60%' }}>
                    <AvatarSelector
                      avatars={avatars}
                      selectedAvatarId={selectedAvatarId || undefined}
                      onSelectAvatar={handleSelectAvatar}
                      isLoading={isGenerating}
                    />
                  </div>
                  {/* Action Buttons */}
                  <div className="flex gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-3 border-t border-stone-200 shrink-0 mb-4 sm:mb-5 md:mb-6">
                    <button
                      onClick={handleUploadClick}
                      className="flex-1 px-2.5 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 border border-stone-200 text-stone-700 hover:bg-stone-100 hover:border-stone-300 transition-colors text-[9px] sm:text-[10px] md:text-xs font-bold tracking-widest sm:tracking-[0.15em] md:tracking-[0.2em] uppercase whitespace-nowrap"
                    >
                      Upload Different Photo
                    </button>
                    <button
                      onClick={handleDeleteAvatar}
                      disabled={isDeletingAvatar}
                      className="px-2.5 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 border border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[9px] sm:text-[10px] md:text-xs font-bold tracking-widest sm:tracking-[0.15em] md:tracking-[0.2em] uppercase whitespace-nowrap"
                    >
                      {isDeletingAvatar ? 'Deleting...' : 'Delete'}
                    </button>
                    {selectedAvatarId && (
                      <button
                        onClick={handleUseAvatar}
                        className="flex-1 bg-black text-white px-2.5 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 text-[9px] sm:text-[10px] md:text-xs font-bold tracking-widest sm:tracking-[0.15em] md:tracking-[0.2em] hover:bg-stone-800 transition-all shadow-xl hover:-translate-y-1 duration-300 uppercase flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 group whitespace-nowrap"
                      >
                        Use This Avatar
                        <span className="group-hover:translate-x-1 transition-transform text-sm sm:text-base md:text-lg">
                          →
                        </span>
                      </button>
                    )}
                  </div>
                  <div className="flex-1"></div>
                </>
              ) : (
                /* Show upload button when there's an avatar but no generated avatars */
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-full">
                    <div className="flex-1"></div>
                    <div className="flex gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-3 border-t border-stone-200 shrink-0 mb-4 sm:mb-5 md:mb-6">
                      <button
                        onClick={handleUploadClick}
                        className="flex-1 px-2.5 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 border border-stone-200 text-stone-700 hover:bg-stone-100 hover:border-stone-300 transition-colors text-[9px] sm:text-[10px] md:text-xs font-bold tracking-widest sm:tracking-[0.15em] md:tracking-[0.2em] uppercase whitespace-nowrap"
                      >
                        Upload Different Photo
                      </button>
                      <button
                        onClick={handleDeleteAvatar}
                        disabled={isDeletingAvatar}
                        className="px-2.5 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 border border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[9px] sm:text-[10px] md:text-xs font-bold tracking-widest sm:tracking-[0.15em] md:tracking-[0.2em] uppercase whitespace-nowrap"
                      >
                        {isDeletingAvatar ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                    <div className="flex-1"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
