import { FashnaiGenerationCompleteSchema } from "@/engine/webhook/fashnai/schema";

declare global {
  type FashnaiGenerationCompletedMessage = z.infer<
    typeof FashnaiGenerationCompleteSchema
  >;
}
