import { z } from 'zod';
import { CachedReferencePhotoSchema } from '@/modules/api/reference-photo/schema';

declare global {
  type CachedReferencePhoto = z.infer<typeof CachedReferencePhotoSchema>;
}
