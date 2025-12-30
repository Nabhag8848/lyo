import { useState } from 'react';
import { useProduct } from '../hooks/use-product';
import { SizeSelector } from './SizeSelector';
import { ActionButtons } from './ActionButtons';
import { CurrentProductDetails } from './CurrentProductDetails';
import { DisplayGeneratedImage } from './DisplayGeneratedImage';

export function FittingRoom() {
  const [isLoading] = useState(false);
  const product = useProduct();
  const selectedSize = product?.selectedSize ?? null;

  const displayPrice = product?.price || '₹1,499';
  const displayMrp = product?.mrp || '';
  const displayDiscount = product?.discount || '';
  const displayBrand = product?.brand || 'H&M';
  const displayName = product?.name || 'Sculpt Tube Top';
  const buttonType = product?.buttonType || 'add_to_bag';
  const sizes = product?.sizes || [];

  // Determine if button should be disabled
  // - "Go to Bag" is always enabled (item already in bag)
  // - "Add to Bag" is only enabled if size is selected (or if no sizes exist)
  const isButtonDisabled =
    buttonType === 'add_to_bag' && sizes.length > 0 && selectedSize === null;

  const handleSizeClick = async (size: string) => {
    await browser.runtime.sendMessage({
      type: 'selectSize',
      size,
    });
  };

  const handleAddToBag = async () => {
    if (!isButtonDisabled) {
      await browser.runtime.sendMessage({
        type: 'clickAddToBag',
        buttonType,
      });
    }
  };

  const getDisplayImageSrc = () => {
    return (
      product?.imageUrl ||
      'https://tryonn.s3.ap-south-1.amazonaws.com/website/model-1-removebg-preview.png'
    );
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Content */}
      <div className="flex-1 flex flex-col min-h-0 p-4 bg-white">
        {/* Image Container */}
        <DisplayGeneratedImage
          imageUrl={getDisplayImageSrc()}
          alt={displayName}
          isLoading={isLoading}
        />

        {/* Product Info & Controls */}
        <div className="shrink-0 space-y-2 overflow-y-auto min-h-0">
          {/* Product Name, Description & Price */}
          <CurrentProductDetails
            brand={displayBrand}
            name={displayName}
            price={displayPrice}
            mrp={displayMrp}
            discount={displayDiscount}
          />

          {/* Size Selector */}
          <SizeSelector
            sizes={sizes}
            selectedSize={selectedSize}
            onSizeClick={handleSizeClick}
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
