import { z } from 'zod';

export const CachedReferencePhotoSchema = z.object({
  photoId: z.string(),
  key: z.string(),
  accessUrl: z.url(),
});
