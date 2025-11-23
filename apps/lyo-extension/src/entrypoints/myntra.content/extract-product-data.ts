import { ProductData } from '@/lib/messaging';

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

    if (!brand || !name || !price) {
      return null;
    }

    const productData = {
      brand,
      name,
      price,
      mrp,
      discount: discountText,
      discountPercent,
      description,
      imageUrl,
    };

    return productData;
  } catch (error) {
    console.error('LYO: Error extracting product data:', error);
    return null;
  }
}
