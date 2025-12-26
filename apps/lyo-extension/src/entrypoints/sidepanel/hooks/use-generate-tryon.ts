import { useCallback, useState } from 'react';
import { generateTryon, type GenerateTryonRequest } from '@/lib/api';

interface UseGenerateTryonResult {
  generate: (data: GenerateTryonRequest) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  jobId: string | null;
}

export const useGenerateTryon = (
  accessToken: string | null
): UseGenerateTryonResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);

  const generate = useCallback(
    async (data: GenerateTryonRequest) => {
      if (!accessToken) {
        setError('No access token available');
        return;
      }

      setIsLoading(true);
      setError(null);
      setJobId(null);

      try {
        const response = await generateTryon(data, accessToken);
        setJobId(response.id);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to generate tryon'
        );
      } finally {
        setIsLoading(false);
      }
    },
    [accessToken]
  );

  return { generate, isLoading, error, jobId };
};

