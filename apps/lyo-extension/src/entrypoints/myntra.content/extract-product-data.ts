import { ProductData, SizeOption } from '@/lib/messaging';

export function extractProductData(): ProductData | null {
  try {
    const brandElement = document.querySelector('h1.pdp-title');
    const brand = brandElement?.textContent?.trim() || '';

    const nameElement = document.querySelector('h1.pdp-name');
    const name = nameElement?.textContent?.trim() || '';

    const priceElement = document.querySelector('.pdp-price strong');
    const price = priceElement?.textContent?.trim() || '';

    const mrpElement = document.querySelector('.pdp-mrp s');
    const mrp = mrpElement?.textContent?.trim() || '';

    const discountElement = document.querySelector('.pdp-discount');
    const discountText = discountElement?.textContent?.trim() || '';
    const discountMatch = discountText.match(/(\d+)%/);
    const discountPercent = discountMatch ? discountMatch[1] + '%' : '';

    const descElement = document.querySelector(
      '.pdp-product-description-content'
    );
    const description = descElement?.textContent?.trim() || '';

    const firstImageContainer = document.querySelector('.image-grid-image');
    let imageUrl = '';
    if (firstImageContainer) {
      const style = firstImageContainer.getAttribute('style') || '';
      const urlMatch = style.match(/url\(["']?([^"']+)["']?\)/);
      if (urlMatch && urlMatch[1]) {
        imageUrl = urlMatch[1];
      }
    }

    // Check which button exists: "GO TO BAG" or "ADD TO BAG"
    const goToBagButton = document.querySelector(
      'a.pdp-goToCart.pdp-add-to-bag'
    );
    // const addToBagButton = document.querySelector(
    //   'div.pdp-add-to-bag.pdp-button.pdp-flex.pdp-center'
    // );
    const buttonType: 'addToBag' | 'goToBag' = goToBagButton
      ? 'goToBag'
      : 'addToBag';

    // Extract available sizes and detect currently selected size
    const sizeButtons = document.querySelectorAll(
      'button.size-buttons-size-button'
    );
    const sizes: SizeOption[] = [];
    let selectedSize: string | null = null;

    sizeButtons.forEach((button) => {
      const sizeElement = button.querySelector('p.size-buttons-unified-size');
      if (sizeElement) {
        const size = sizeElement.textContent?.trim() || '';
        // Check if size is available - unavailable sizes typically have disabled class or strike-through
        const isDisabled = button.classList.contains(
          'size-buttons-size-button-disabled'
        );
        const hasStrike = button.querySelector(
          '.size-buttons-size-strike:not(.size-buttons-size-strike-hide)'
        );
        const available = !isDisabled && !hasStrike;

        // Check if this size is currently selected
        // Primary check: size-buttons-size-button-selected class (most reliable)
        const isSelected =
          button.classList.contains('size-buttons-size-button-selected') ||
          button.getAttribute('aria-selected') === 'true' ||
          button.getAttribute('data-selected') === 'true';

        if (size) {
          sizes.push({ size, available });
          if (isSelected && !selectedSize) {
            selectedSize = size;
          }
        }
      }
    });

    if (!brand || !name || !price) {
      return null;
    }

    const productData: ProductData = {
      brand,
      name,
      price,
      mrp,
      discount: discountText,
      discountPercent,
      description,
      imageUrl,
      buttonType,
      sizes,
      selectedSize,
    };

    return productData;
  } catch (error) {
    console.error('LYO: Error extracting product data:', error);
    return null;
  }
}
