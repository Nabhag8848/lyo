declare interface ReferencePhoto {
  id: string;
  url?: string;
}

declare interface ReferencePhotoSelectorProps {
  referencePhotos: ReferencePhoto[];
  selectedReferencePhotoId?: string;
  onSelectReferencePhoto: (referencePhotoId: string) => void;
  isLoading?: boolean;
}
