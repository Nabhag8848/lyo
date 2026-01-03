import { z } from 'zod';

export const FashnaiGenerationCompleteSchema = z.object({
  id: z.string(),
  signedUrl: z.string(),
  garment: z.object({
    id: z.string(),
    garmentUrl: z.string(),
    sourceUrl: z.string(),
    brandName: z.string().nullable().optional(),
    garmentBrandName: z.string().nullable().optional(),
    garmentName: z.string().nullable().optional(),
    garmentDescription: z.string().nullable().optional(),
  }),
});
