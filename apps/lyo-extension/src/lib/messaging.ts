export interface SizeOption {
  size: string;
  available: boolean;
}

export interface ProductData {
  brand: string;
  name: string;
  price: string;
  mrp: string;
  discount: string;
  discountPercent: string;
  description: string;
  imageUrl: string;
  buttonType: 'addToBag' | 'goToBag';
  sizes: SizeOption[];
  selectedSize?: string | null;
}
