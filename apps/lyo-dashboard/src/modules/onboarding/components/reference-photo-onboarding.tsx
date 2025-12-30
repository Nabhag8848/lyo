import { useState, useRef, useEffect } from 'react';
import { ReferencePhotoSelector } from './reference-photo-selector';
import { useUploadReferencePhoto } from '@/modules/onboarding/hooks/use-upload-reference-photo';
import { useReferencePhoto } from '@/modules/onboarding/hooks/use-reference-photo';
import { useDeleteReferencePhoto } from '@/modules/onboarding/hooks/use-delete-reference-photo';

export const ReferencePhotoOnboarding = () => {
  const [referencePhotos, setReferencePhotos] = useState<ReferencePhoto[]>([]);
  const [selectedReferencePhotoId, setSelectedReferencePhotoId] = useState<
    string | null
  >(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadReferencePhoto } = useUploadReferencePhoto();
  const {
    data: alreadyUploadedReferencePhoto,
    isLoading: isLoadingReferencePhoto,
  } = useReferencePhoto();
  const { mutate: deleteReferencePhoto, isPending: isDeletingReferencePhoto } =
    useDeleteReferencePhoto();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadReferencePhoto(file);
    }
    if (file) {
      event.target.value = '';
    }
  };

  useEffect(() => {
    if (alreadyUploadedReferencePhoto) {
      generateReferencePhotos(alreadyUploadedReferencePhoto.url ?? '');
    }
  }, [alreadyUploadedReferencePhoto]);

  const generateReferencePhotos = async (imageUrl: string) => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      // Mock reference photos - replace with actual API call
      const mockReferencePhotos: ReferencePhoto[] = Array.from(
        { length: 8 },
        (_, i) => ({
          id: `reference-photo-${i + 1}`,
          url: imageUrl, // In real implementation, this would be the generated reference photo URL
        })
      );
      setReferencePhotos(mockReferencePhotos);
      // Auto-select first reference photo
      if (mockReferencePhotos.length > 0) {
        setSelectedReferencePhotoId(mockReferencePhotos[0].id);
      }
      setIsGenerating(false);
    }, 2000);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSelectReferencePhoto = (referencePhotoId: string) => {
    setSelectedReferencePhotoId(referencePhotoId);
  };

  // Get the selected reference photo URL or default to first reference photo
  const getDisplayReferencePhotoUrl = () => {
    if (selectedReferencePhotoId) {
      const selected = referencePhotos.find(
        (a) => a.id === selectedReferencePhotoId
      );
      return selected?.url;
    }
    return alreadyUploadedReferencePhoto?.url;
  };

  const handleUseReferencePhoto = () => {
    if (selectedReferencePhotoId) {
      // TODO: Call backend API to save selected reference photo
    }
  };

  const handleDeleteReferencePhoto = () => {
    deleteReferencePhoto(undefined, {
      onSuccess: () => {
        setReferencePhotos([]);
        setSelectedReferencePhotoId(null);
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

        {isLoadingReferencePhoto ? (
          <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-stone-200 rounded-xl bg-white shadow-sm">
            <div className="mb-5">
              <div className="w-16 h-16 border-2 border-stone-300 border-t-stone-600 rounded-full animate-spin mx-auto" />
            </div>
            <p className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-stone-500 uppercase">
              Loading avatar...
            </p>
          </div>
        ) : !alreadyUploadedReferencePhoto ? (
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
            <p className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-stone-500 uppercase">
              JPG, PNG or HEIC up to 10MB
            </p>
          </div>
        ) : (
          <div className="flex gap-8 flex-1 min-h-0">
            {/* Left Side - Main Reference Photo Display */}
            <div className="flex-[0.4] flex items-center justify-center min-w-0 min-h-0 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center p-4 sm:p-6 xl:p-4 xl:max-h-[calc(100vh-8rem)]">
                <img
                  src={getDisplayReferencePhotoUrl() || ''}
                  alt="Selected Reference Photo"
                  className="max-w-full max-h-full w-auto h-auto object-contain xl:max-h-[calc(100vh-10rem)]"
                />
              </div>
            </div>

            {/* Right Side - Scrollable Reference Photos and Buttons */}
            <div className="flex-[0.6] flex flex-col min-w-0 min-h-0">
              {isGenerating ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-600 rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-stone-500 uppercase">
                      Generating avatars...
                    </p>
                  </div>
                </div>
              ) : referencePhotos.length > 0 ? (
                <>
                  {/* Reference Photo Selector */}
                  <div className="flex-1"></div>
                  <div className="shrink-0 mb-2" style={{ maxHeight: '60%' }}>
                    <ReferencePhotoSelector
                      referencePhotos={referencePhotos}
                      selectedReferencePhotoId={
                        selectedReferencePhotoId || undefined
                      }
                      onSelectReferencePhoto={handleSelectReferencePhoto}
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
                      onClick={handleDeleteReferencePhoto}
                      disabled={isDeletingReferencePhoto}
                      className="px-2.5 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 border border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[9px] sm:text-[10px] md:text-xs font-bold tracking-widest sm:tracking-[0.15em] md:tracking-[0.2em] uppercase whitespace-nowrap"
                    >
                      {isDeletingReferencePhoto ? 'Deleting...' : 'Delete'}
                    </button>
                    {selectedReferencePhotoId && (
                      <button
                        onClick={handleUseReferencePhoto}
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
                /* Show upload button when there's a reference photo but no generated reference photos */
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
                        onClick={handleDeleteReferencePhoto}
                        disabled={isDeletingReferencePhoto}
                        className="px-2.5 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 border border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[9px] sm:text-[10px] md:text-xs font-bold tracking-widest sm:tracking-[0.15em] md:tracking-[0.2em] uppercase whitespace-nowrap"
                      >
                        {isDeletingReferencePhoto ? 'Deleting...' : 'Delete'}
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
