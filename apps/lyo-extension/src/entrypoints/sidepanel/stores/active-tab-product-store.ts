import { create } from 'zustand';

enum ActiveTabProductButton {
  ADD_TO_BAG = 'add_to_bag',
  GO_TO_BAG = 'go_to_bag',
}

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

export const createActiveTabProductStore = create<ActiveTabProductState>()(
  () => ({
    brand: null,
    name: null,
    price: null,
    mrp: null,
    discount: null,
    discountPercent: null,
    description: null,
    imageUrl: null,
    sourceUrl: null,
    buttonType: null,
    sizeOptions: null,
    selectedSize: null,
  })
);
