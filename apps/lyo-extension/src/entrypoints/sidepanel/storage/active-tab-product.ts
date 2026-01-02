export const activeTabProduct = storage.defineItem<Product | null>(
  'session:active_tab_product',
  {
    defaultValue: null,
  }
);
