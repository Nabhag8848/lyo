export const activeTabProduct =
  storage.defineItem<ActiveTabProductState | null>(
    'session:active_tab_product',
    {
      defaultValue: null,
    }
  );
