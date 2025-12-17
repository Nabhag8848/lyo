export const currentProductView = storage.defineItem<Product>(
  'session:current_product_view',
  {
    defaultValue: undefined,
  }
);
