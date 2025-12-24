import { z } from 'zod';

export const FashnaiGenerationCompleteSchema = z.object({
  id: z.string(),
  imageUrl: z.string(),
});
