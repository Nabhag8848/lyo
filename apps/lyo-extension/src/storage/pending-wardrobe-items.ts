export const pendingWardrobeItems = storage.defineItem<
  Pick<PendingWardrobeItemState, 'pendingWardrobeItems'>
>('session:pending_wardrobe_items', {
  defaultValue: { pendingWardrobeItems: [] },
});
