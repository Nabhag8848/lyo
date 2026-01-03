// Module augmentation for WXT's browser types
// Extends the sidePanel namespace with Chrome 141+ onOpened event
// Reference: https://developer.chrome.com/docs/extensions/reference/api/sidePanel#event-onOpened

/**
 * Information about a side panel that was opened (Chrome 141+)
 */
type PanelOpenedInfo = {
  /** The path of the local resource within the extension package whose content is displayed in the panel. */
  path: string;
  /** The optional ID of the tab where the side panel is opened. This is provided only when the panel is tab-specific. */
  tabId?: number;
  /** The ID of the window where the side panel is opened. This is available for both global and tab-specific panels. */
  windowId: number;
};

interface SidePanelEvent {
  addListener(callback: (info: PanelOpenedInfo) => void | Promise<void>): void;
}

// Augment the wxt/browser module
declare module 'wxt/browser' {
  namespace Browser {
    namespace sidePanel {
      /**
       * Chrome 141+ event fired when the extension's side panel is opened.
       * @since Chrome 141
       */
      const onOpened: SidePanelEvent;
    }
  }
}

import { ActiveTabProductButton, WardrobeItemStatus } from '@/constants';

declare global {
  type User = {
    isActive: boolean;
  };

  type SizeOption = {
    size: string;
    available: boolean;
  };

  type ActiveTabProductState = {
    brand: string | null;
    name: string | null;
    price: string | null;
    mrp: string | null;
    discount: string | null;
    discountPercent: string | null;
    description: string | null;
    imageUrl: string | null;
    sourceUrl: string | null;
    buttonType: ActiveTabProductButton | null;
    sizeOptions: SizeOption[] | null;
    selectedSize?: string | null;
  };

  type SignInState = {
    accessToken: string | null;
    isHydrated: boolean;
    setAccessToken: (accessToken: string | null) => void;
    hydrate: () => Promise<void>;
  };

  type ReferencePhoto = {
    id: string;
    url: string;
  };

  type ReferencePhotoState = {
    referencePhoto: ReferencePhoto | null;
    setReferencePhoto: (referencePhoto: ReferencePhoto | null) => void;
  };

  type PendingWardrobeItemState = {
    pendingWardrobeItems: Array<PendingWardrobeItem>;
    prependItem: (item: PendingWardrobeItem) => void;
    updateItemByOptimisticId: (
      optimisticId: string,
      updates: Partial<PendingWardrobeItem>
    ) => void;
    updateItem(id: string, updates: Partial<PendingWardrobeItem>);
    removeItem: (optimisticId: string) => void;
  };

  type Garment = {
    id: string;
    garmentUrl: string;
    sourceUrl: string;
    brandName: string | null;
    garmentBrandName: string | null;
    garmentName: string | null;
    garmentDescription: string | null;
  };

  type PendingWardrobeItem = {
    id?: string;
    optimisticId: string;
    signedUrl?: string;
    status: WardrobeItemStatus;
    garment: Garment;
  };

  type WardrobeItemResponse = {
    id: string;
    signedUrl: string;
    garment: Garment;
  };

  type WardrobeItem = {
    id: string;
    signedUrl: string;
    status: WardrobeItemStatus;
    garment: Garment;
  };

  type WardrobeResponse = {
    wardrobe: Array<WardrobeItemResponse>;
    nextCursor: string | null;
  };

  type WardrobeState = {
    wardrobe: Array<WardrobeItem>;
    setWardrobe: (wardrobe: Array<WardrobeResponse>) => void;
    prependWardrobeItem: (wardrobeItem: WardrobeItem) => void;
  };
}

export {};
