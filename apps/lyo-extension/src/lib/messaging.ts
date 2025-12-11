export interface SizeOption {
  size: string;
  available: boolean;
}

export interface Product {
  brand: string;
  name: string;
  price: string;
  mrp: string;
  discount: string;
  discountPercent: string;
  description: string;
  imageUrl: string;
  buttonType: 'add_to_bag' | 'go_to_bag';
  sizes: SizeOption[];
  selectedSize?: string | null;
}
