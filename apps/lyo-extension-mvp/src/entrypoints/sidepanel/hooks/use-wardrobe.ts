import useSWRInfinite from 'swr/infinite';
import { api } from '@/api/util';

const fetchWardrobe = async (
  cursor: string | null | undefined
): Promise<WardrobeResponse> => {
  const baseUrl = api.serverUrl;
  const url = cursor
    ? `${baseUrl}/wardrobe/me?cursor=${encodeURIComponent(cursor)}`
    : `${baseUrl}/wardrobe/me`;

  const res = await fetch(url, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch wardrobe');
  }

  return res.json();
};

const getKey = (
  pageIndex: number,
  previousPageData: WardrobeResponse | null
) => {
  // Reached the end
  if (previousPageData && !previousPageData.nextCursor) return null;

  // First page, we don't have `previousPageData`
  if (pageIndex === 0) return ['wardrobe', null];

  // Add the cursor to the API endpoint
  return ['wardrobe', previousPageData?.nextCursor];
};

export const useWardrobe = () => {
  const { data, error, isLoading, isValidating, size, setSize } =
    useSWRInfinite<WardrobeResponse, Error>(
      getKey,
      ([, cursor]) => fetchWardrobe(cursor),
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }
    );

  const wardrobeItems: WardrobeItem[] = data
    ? data.flatMap((page) => page.wardrobe)
    : [];

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.wardrobe.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.nextCursor === null);

  const loadMore = () => {
    if (!isReachingEnd && !isLoadingMore) {
      setSize(size + 1);
    }
  };

  return {
    wardrobeItems,
    isLoading,
    isValidating,
    isLoadingMore,
    isReachingEnd,
    error,
    loadMore,
  };
};
