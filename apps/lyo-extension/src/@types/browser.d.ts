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

declare global {
  type SizeOption = {
    size: string;
    available: boolean;
  };

  type Product = {
    brand: string;
    name: string;
    price: string;
    mrp: string;
    discount: string;
    discountPercent: string;
    description: string;
    imageUrl: string;
    sourceUrl: string;
    buttonType: 'add_to_bag' | 'go_to_bag';
    sizes: SizeOption[];
    selectedSize?: string | null;
  };

  type ReferencePhoto = {
    id: string;
    url: string;
  };

  type WardrobeItem = {
    id: string;
    signedUrl: string;
    garment: {
      id: string;
      garmentUrl: string;
      sourceUrl: string;
      brandName?: string | null;
      garmentBrandName?: string | null;
      garmentName?: string | null;
      garmentDescription?: string | null;
    };
  };

  type WardrobeResponse = {
    wardrobe: WardrobeItem[];
    nextCursor: string | null;
  };

  type User = {
    isActive: boolean;
  };
}

export {};
