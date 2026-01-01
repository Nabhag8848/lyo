import { useState, useMemo, useEffect } from 'react';
import { useProduct } from '../hooks/use-product';
import { useWardrobeWithGenerations } from '../hooks/use-wardrobe-with-generations';
import {
  useIsCurrentProduct,
  getItemSourceUrl,
  getItemDisplayInfo,
} from '../hooks/use-is-current-product';
import { useGenerationStore } from '../stores/generation-store';
import { SizeSelector } from './SizeSelector';
import { ActionButtons } from './ActionButtons';
import { CurrentProductDetails } from './CurrentProductDetails';
import { DisplayGeneratedImage } from './DisplayGeneratedImage';
import { Wardrobe } from './Wardrobe';

/**
 * Checks if item is currently generating (still pending)
 */
function isItemGenerating(item: WardrobeDisplayItem | null): boolean {
  if (!item) return false;
  return item.type === 'pending' && item.generation.status === 'pending';
}

/**
 * Gets the display image URL for the main view
 */
function getDisplayImageUrl(
  item: WardrobeDisplayItem | null,
  product: Product | null
): string {
  if (!item) return '';

  // For pending generation that's still loading, we'll show product image in loading overlay
  // For completed pending generation, show generated image
  if (item.type === 'pending') {
    if (
      item.generation.status === 'completed' &&
      item.generation.generatedImageUrl
    ) {
      return item.generation.generatedImageUrl;
    }
    // Return empty - DisplayGeneratedImage will handle loading state
    return '';
  }

  // For completed wardrobe items
  if (item.type === 'completed') {
    return item.item.signedUrl;
  }

  // For reference type (shouldn't happen with new logic, but just in case)
  if (item.type === 'reference') {
    return product?.imageUrl || item.imageUrl;
  }

  return '';
}

export function FittingRoom() {
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const product = useProduct();
  const selectedSize = product?.selectedSize ?? null;
  const { allItems } = useWardrobeWithGenerations();

  // Hydrate generation store on mount
  const hydrate = useGenerationStore((s) => s.hydrate);
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // Get the selected item
  const selectedItem = allItems[selectedAvatar] ?? null;

  // Check if selected item matches current tab URL
  const isCurrentProduct = useIsCurrentProduct(selectedItem);

  // Check if selected item is currently generating
  const isGenerating = isItemGenerating(selectedItem);

  // Get the product image URL for loading state
  const loadingImageUrl = useMemo(() => {
    if (selectedItem?.type === 'pending') {
      return selectedItem.generation.productImageUrl;
    }
    if (product?.imageUrl) {
      return product.imageUrl;
    }
    return '';
  }, [selectedItem, product]);

  // Get display info based on selected item
  const displayInfo = useMemo(() => {
    // For pending generation (whether still loading or completed)
    if (selectedItem?.type === 'pending') {
      const gen = selectedItem.generation;
      return {
        brand: gen.productInfo.garmentBrandName || gen.productInfo.brand || '',
        name: gen.productInfo.garmentName || gen.productInfo.name || '',
        price: isCurrentProduct ? product?.price || '' : '',
        mrp: isCurrentProduct ? product?.mrp || '' : '',
        discount: isCurrentProduct ? product?.discount || '' : '',
      };
    }

    // Get base display info from item
    const itemInfo = getItemDisplayInfo(selectedItem);

    return {
      brand: itemInfo.brand || product?.brand || '',
      name: itemInfo.name || product?.name || '',
      // Only show price/MRP/discount if this is the current product
      price: isCurrentProduct ? product?.price || '' : '',
      mrp: isCurrentProduct ? product?.mrp || '' : '',
      discount: isCurrentProduct ? product?.discount || '' : '',
    };
  }, [selectedItem, product, isCurrentProduct]);

  const displayPrice = displayInfo.price;
  const displayMrp = displayInfo.mrp;
  const displayDiscount = displayInfo.discount;
  const displayBrand = displayInfo.brand;
  const displayName = displayInfo.name;

  // Determine button type based on product context
  // If no product exists, or product exists but selected item doesn't match, show "go_to_page" button
  // Otherwise use product's buttonType
  const buttonType: 'add_to_bag' | 'go_to_bag' | 'go_to_page' =
    !product || !isCurrentProduct ? 'go_to_page' : product.buttonType;
  const sizes = isCurrentProduct ? product?.sizes || [] : [];

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
      const sourceUrl = getItemSourceUrl(selectedItem);

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

  // Get the image to display in the main view
  const displayImageUrl = getDisplayImageUrl(selectedItem, product);

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Content */}
      <div className="flex-1 flex flex-col min-h-0 p-4 pb-0 bg-white">
        {/* Image Container */}
        <DisplayGeneratedImage
          imageUrl={displayImageUrl}
          alt={displayName}
          isLoading={isGenerating}
          loadingImageUrl={loadingImageUrl}
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
          {isCurrentProduct && sizes.length > 0 && (
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
