import { apiClient } from '@/api/util';
import useSWRInfinite from 'swr/infinite';
import { useWardrobeStore } from '@/entrypoints/sidepanel/stores';

const fetchWardrobe = async (
  cursor: string | null | undefined
): Promise<WardrobeResponse> => {
  const res = await apiClient.get<WardrobeResponse>('/wardrobe/me', {
    params: cursor ? { cursor } : undefined,
  });
  return res.data;
};

type WardrobeKey = readonly [string, string | null | undefined];

const getKey = (
  pageIndex: number,
  previousPageData: WardrobeResponse | null
): WardrobeKey | null => {
  if (previousPageData && !previousPageData.nextCursor) return null;

  if (pageIndex === 0) return ['wardrobe', null];

  return ['wardrobe', previousPageData?.nextCursor];
};

export const useWardrobe = () => {
  const {
    data: wardrobe,
    error,
    isLoading,
    isValidating,
    size: pageSize,
    setSize: setPageSize,
  } = useSWRInfinite<WardrobeResponse, Error>(
    getKey,
    ([, cursor]: WardrobeKey) => fetchWardrobe(cursor),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onSuccess: (wardrobe) => {
        if (wardrobe) {
          useWardrobeStore.getState().setWardrobe(wardrobe);
        }
      },
    }
  );

  const lastWardrobeResponse = wardrobe ? wardrobe[wardrobe.length - 1] : null;
  const hasMoreWardrobeItems = lastWardrobeResponse?.nextCursor !== null;

  const loadMoreWardrobeItems = () => {
    if (hasMoreWardrobeItems) {
      setPageSize(pageSize + 1);
    }
  };

  return {
    isLoading,
    isValidating,
    error,
    hasMoreWardrobeItems,
    loadMoreWardrobeItems,
  };
};
