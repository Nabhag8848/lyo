import { useState, useMemo } from 'react';
import { useProduct } from '../hooks/use-product';
import { useWardrobe } from '../hooks/use-wardrobe';
import { useReferencePhoto } from '../hooks/use-reference-photo';
import { useCurrentTabUrl } from '../hooks/use-current-tab-url';
import { SizeSelector } from './SizeSelector';
import { ActionButtons } from './ActionButtons';
import { CurrentProductDetails } from './CurrentProductDetails';
import { DisplayGeneratedImage } from './DisplayGeneratedImage';
import { Wardrobe } from './Wardrobe';

export function FittingRoom() {
  const [isLoading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const product = useProduct();
  const selectedSize = product?.selectedSize ?? null;
  const { wardrobeItems } = useWardrobe();
  const { data: referencePhoto } = useReferencePhoto();
  const currentTabUrl = useCurrentTabUrl();

  // Combine reference photo (index 0) with wardrobe items, only include reference photo if product exists
  const allItems = useMemo(() => {
    const items: Array<{
      id: string;
      imageUrl: string;
      isReference: boolean;
      garment?: WardrobeItem['garment'];
    }> = [];

    // Only add reference photo if product exists (when sidepanel opened with tryon button)
    if (product && referencePhoto?.url) {
      items.push({
        id: 'reference',
        imageUrl: referencePhoto.url,
        isReference: true,
      });
    }

    wardrobeItems.forEach((item) => {
      items.push({
        id: item.id,
        imageUrl: item.signedUrl,
        isReference: false,
        garment: item.garment,
      });
    });

    return items;
  }, [product, referencePhoto, wardrobeItems]);

  // Get the selected item to access garment sourceUrl when needed
  const selectedItem = allItems[selectedAvatar];

  // Check if the selected item matches the current product
  // Match when:
  // 1. Selected item is the reference photo (index 0) and product exists, OR
  // 2. Selected item's garment.sourceUrl matches the current tab URL
  const isCurrentProduct = useMemo(() => {
    if (!product) return false;

    // If selected item is reference photo (index 0), it's the current product
    if (selectedAvatar === 0 && selectedItem?.isReference) {
      return true;
    }

    // Otherwise, check if garment sourceUrl matches current tab URL
    if (
      selectedItem &&
      !selectedItem.isReference &&
      selectedItem.garment?.sourceUrl &&
      currentTabUrl
    ) {
      // Normalize URLs for comparison (remove trailing slashes, query params, etc.)
      const normalizeUrl = (url: string) => {
        try {
          const urlObj = new URL(url);
          return `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`.replace(
            /\/$/,
            ''
          );
        } catch {
          return url.replace(/\/$/, '');
        }
      };

      const normalizedGarmentUrl = normalizeUrl(selectedItem.garment.sourceUrl);
      const normalizedTabUrl = normalizeUrl(currentTabUrl);
      return normalizedGarmentUrl === normalizedTabUrl;
    }

    return false;
  }, [product, selectedAvatar, selectedItem, currentTabUrl]);

  // Get display info based on selected avatar - use garment info if available
  const displayInfo = useMemo(() => {
    // If we have a wardrobe item (not reference photo) with garment info, use it
    if (selectedItem && !selectedItem.isReference && selectedItem.garment) {
      return {
        brand: selectedItem.garment.garmentBrandName || product?.brand || '',
        name: selectedItem.garment.garmentName || product?.name || '',
        // Only show price/MRP/discount if this is the current product
        price: isCurrentProduct ? product?.price || '' : '',
        mrp: isCurrentProduct ? product?.mrp || '' : '',
        discount: isCurrentProduct ? product?.discount || '' : '',
      };
    }

    // Otherwise use product info (only if product exists)
    return {
      brand: product?.brand || '',
      name: product?.name || '',
      // Only show price/MRP/discount if this is the current product
      price: isCurrentProduct ? product?.price || '' : '',
      mrp: isCurrentProduct ? product?.mrp || '' : '',
      discount: isCurrentProduct ? product?.discount || '' : '',
    };
  }, [selectedAvatar, selectedItem, product, isCurrentProduct]);

  const displayPrice = displayInfo.price;
  const displayMrp = displayInfo.mrp;
  const displayDiscount = displayInfo.discount;
  const displayBrand = displayInfo.brand;
  const displayName = displayInfo.name;
  // If no product exists, or product exists but selected item doesn't match, show "go_to_page" button
  // Otherwise use product's buttonType
  const buttonType =
    !product || !isCurrentProduct ? 'go_to_page' : product.buttonType;
  const sizes = product?.sizes || [];

  // Determine if button should be disabled
  // - "Add to Bag" is only enabled if size is selected (or if no sizes exist)
  // - "Go to Page" is never disabled (as long as we have a sourceUrl)
  const isButtonDisabled =
    buttonType === 'add_to_bag' && sizes.length > 0 && selectedSize === null;

  const handleSizeClick = async (size: string) => {
    await browser.runtime.sendMessage({
      type: 'selectSize',
      size,
    });
  };

  const handleAddToBag = async () => {
    if (isButtonDisabled) return;

    // If button type is "go_to_page", redirect to the garment sourceUrl
    if (buttonType === 'go_to_page') {
      const sourceUrl =
        selectedItem && !selectedItem.isReference && selectedItem.garment
          ? selectedItem.garment.sourceUrl
          : null;

      if (sourceUrl) {
        // Redirect within the same tab
        try {
          const [tab] = await browser.tabs.query({
            active: true,
            currentWindow: true,
          });
          if (tab?.id) {
            await browser.tabs.update(tab.id, { url: sourceUrl });
          }
        } catch (error) {
          console.error('Failed to navigate to source URL:', error);
        }
      }
      return;
    }

    // Otherwise, handle add to bag / go to bag
    await browser.runtime.sendMessage({
      type: 'clickAddToBag',
      buttonType,
    });
  };

  const getDisplayImageSrc = () => {
    // If product exists, selectedAvatar is 0, and there's a reference photo, show product image
    if (product && selectedAvatar === 0 && referencePhoto?.url) {
      return (product?.imageUrl as string) || '';
    }

    // Otherwise, show the selected item from allItems
    // When no product exists, allItems[0] will be the first wardrobe item
    // When product exists, allItems[0] will be reference photo, allItems[1+] will be wardrobe items
    const selectedItem = allItems[selectedAvatar];
    return selectedItem?.imageUrl || '';
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Content */}
      <div className="flex-1 flex flex-col min-h-0 p-4 pb-0 bg-white">
        {/* Image Container */}
        <DisplayGeneratedImage
          imageUrl={getDisplayImageSrc()}
          alt={displayName}
          isLoading={isLoading}
        />

        {/* Product Info & Controls */}
        <div className="shrink-0 space-y-2 overflow-y-auto overflow-x-hidden min-h-0">
          {/* Product Name, Description & Price */}
          <CurrentProductDetails
            brand={displayBrand}
            name={displayName}
            price={displayPrice}
            mrp={displayMrp}
            discount={displayDiscount}
          />

          {/* Size Selector - only show when selected item matches current product */}
          {isCurrentProduct && (
            <SizeSelector
              sizes={sizes}
              selectedSize={selectedSize}
              onSizeClick={handleSizeClick}
            />
          )}

          {/* Wardrobe */}
          <Wardrobe
            selectedAvatar={selectedAvatar}
            setSelectedAvatar={setSelectedAvatar}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <ActionButtons
        buttonType={buttonType}
        isDisabled={isButtonDisabled}
        price={displayPrice}
        onAddToBag={handleAddToBag}
      />
    </div>
  );
}
