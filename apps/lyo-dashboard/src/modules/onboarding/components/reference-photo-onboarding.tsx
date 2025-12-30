import { useState, useRef, useEffect } from 'react';
import { ReferencePhotoSelector } from './reference-photo-selector';
import { useUploadReferencePhoto } from '@/modules/onboarding/hooks/use-upload-reference-photo';
import { useReferencePhoto } from '@/modules/onboarding/hooks/use-reference-photo';
import { useDeleteReferencePhoto } from '@/modules/onboarding/hooks/use-delete-reference-photo';
import { PageHeader } from '@/app/components';

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
    <div className="bg-stone-50 text-stone-900 h-full flex flex-col max-h-screen overflow-hidden">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-4 sm:py-6 flex-1 flex flex-col min-h-0 w-full max-w-8xl max-h-full overflow-hidden">
        {/* File input - always available for both upload states */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <PageHeader
          title="Create Your Avatar"
          description="Upload your photo to generate lookalike avatars"
        />

        {isLoadingReferencePhoto ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 border-2 border-dashed border-stone-200 rounded-xl bg-white shadow-sm">
            <div className="mb-4 sm:mb-5">
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-stone-300 border-t-stone-600 rounded-full animate-spin mx-auto" />
            </div>
            <p className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-stone-500 uppercase">
              Loading avatar...
            </p>
          </div>
        ) : !alreadyUploadedReferencePhoto ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 border-2 border-dashed border-stone-200 rounded-xl bg-white shadow-sm">
            <div className="mb-4 sm:mb-5">
              <svg
                className="w-12 h-12 sm:w-16 sm:h-16 text-stone-400"
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
              className="bg-black text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-xs font-bold tracking-[0.2em] hover:bg-stone-800 transition-all shadow-xl hover:-translate-y-1 duration-300 uppercase mb-3"
            >
              Upload Photo
            </button>
            <p className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-stone-500 uppercase">
              JPG, PNG or HEIC up to 10MB
            </p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 flex-1 min-h-0 overflow-hidden">
            {/* Left Side - Main Reference Photo Display */}
            <div className="flex-1 lg:flex-[0.4] flex items-center justify-center min-w-0 min-h-0 overflow-hidden max-h-[calc(100vh-300px)] sm:max-h-full lg:max-h-full">
              <div className="w-full h-full flex items-center justify-center p-2 sm:p-3 lg:p-6 max-h-full">
                <img
                  src={getDisplayReferencePhotoUrl() || ''}
                  alt="Selected Reference Photo"
                  className="max-w-full max-h-full w-auto h-auto object-contain"
                />
              </div>
            </div>

            {/* Right Side - Scrollable Reference Photos and Buttons */}
            <div className="flex-none lg:flex-[0.6] flex flex-col min-w-0 lg:min-h-0 overflow-hidden lg:h-full mt-auto lg:mt-0">
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
                <div className="flex flex-col lg:h-full lg:min-h-0">
                  {/* Reference Photo Selector */}
                  <div className="flex items-center justify-center py-2 lg:py-8">
                    <div className="w-full min-h-[96px] sm:min-h-[120px] max-h-[30vh] sm:max-h-[35vh] lg:max-h-[60%] mb-3 lg:mb-6">
                      <ReferencePhotoSelector
                        referencePhotos={referencePhotos}
                        selectedReferencePhotoId={
                          selectedReferencePhotoId || undefined
                        }
                        onSelectReferencePhoto={handleSelectReferencePhoto}
                        isLoading={isGenerating}
                      />
                    </div>
                  </div>
                  {/* Action Buttons - Right below selector */}
                  <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-3 lg:pt-4 border-t border-stone-200 shrink-0">
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
                </div>
              ) : (
                /* Show upload button when there's a reference photo but no generated reference photos */
                <div className="flex-1 flex items-center justify-center min-h-0 overflow-hidden">
                  <div className="w-full flex flex-col h-full">
                    <div className="flex-1 min-h-0"></div>
                    <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-3 border-t border-stone-200 shrink-0 mb-2 sm:mb-4 md:mb-6">
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
