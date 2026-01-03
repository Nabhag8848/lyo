import { useMemo } from 'react';
import { useCurrentTabUrl } from './use-current-tab-url';

/**
 * Normalizes a URL for comparison by removing trailing slashes,
 * query parameters, and fragments.
 */
function normalizeUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    // Only keep protocol, host, and pathname
    return `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`.replace(
      /\/$/,
      ''
    );
  } catch {
    // If URL parsing fails, do basic normalization
    return url.replace(/\/$/, '').split('?')[0].split('#')[0];
  }
}

/**
 * Determines if a wardrobe display item matches the current tab's URL.
 * This is used to show/hide size selector, price info, and action buttons.
 *
 * Returns true when:
 * - Item is a reference photo (always represents current product)
 * - Item's sourceUrl matches the current tab URL
 */
export function useIsCurrentProduct(item: WardrobeDisplayItem | null): boolean {
  const currentTabUrl = useCurrentTabUrl();

  return useMemo(() => {
    if (!item || !currentTabUrl) return false;

    // Reference photo is always the current product
    if (item.type === 'reference') {
      return true;
    }

    // Pending generation - check productInfo.sourceUrl
    if (item.type === 'pending') {
      return (
        normalizeUrl(item.generation.productInfo.sourceUrl) ===
        normalizeUrl(currentTabUrl)
      );
    }

    // Completed item - check garment.sourceUrl
    if (item.type === 'completed') {
      return (
        normalizeUrl(item.item.garment.sourceUrl) ===
        normalizeUrl(currentTabUrl)
      );
    }

    return false;
  }, [item, currentTabUrl]);
}

/**
 * Gets the source URL from a wardrobe display item.
 * Used for navigation to the product page.
 */
export function getItemSourceUrl(
  item: WardrobeDisplayItem | null
): string | null {
  if (!item) return null;

  if (item.type === 'reference') {
    return null; // Reference photo doesn't have a navigable URL
  }

  if (item.type === 'pending') {
    return item.generation.productInfo.sourceUrl;
  }

  if (item.type === 'completed') {
    return item.item.garment.sourceUrl;
  }

  return null;
}

/**
 * Gets display info (brand, name) from a wardrobe display item.
 */
export function getItemDisplayInfo(item: WardrobeDisplayItem | null): {
  brand: string;
  name: string;
} {
  if (!item) {
    return { brand: '', name: '' };
  }

  if (item.type === 'reference') {
    return { brand: '', name: '' }; // Will be filled from product context
  }

  if (item.type === 'pending') {
    return {
      brand:
        item.generation.productInfo.garmentBrandName ||
        item.generation.productInfo.brand ||
        '',
      name:
        item.generation.productInfo.garmentName ||
        item.generation.productInfo.name ||
        '',
    };
  }

  if (item.type === 'completed') {
    return {
      brand:
        item.item.garment.garmentBrandName || item.item.garment.brandName || '',
      name: item.item.garment.garmentName || '',
    };
  }

  return { brand: '', name: '' };
}

/**
 * Gets the image URL to display for a wardrobe item.
 */
export function getItemImageUrl(item: WardrobeDisplayItem | null): string {
  if (!item) return '';

  if (item.type === 'reference') {
    return item.imageUrl;
  }

  if (item.type === 'pending') {
    // If generation is complete, show generated image; otherwise show product image
    return item.generation.generatedImageUrl || item.generation.productImageUrl;
  }

  if (item.type === 'completed') {
    return item.item.signedUrl;
  }

  return '';
}

/**
 * Checks if a wardrobe item is currently generating (pending and not completed).
 */
export function isItemGenerating(item: WardrobeDisplayItem | null): boolean {
  if (!item) return false;
  return item.type === 'pending' && item.generation.status === 'pending';
}
