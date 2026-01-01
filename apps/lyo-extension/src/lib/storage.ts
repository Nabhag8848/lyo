export const currentProductView = storage.defineItem<Product | null>(
  'session:current_product_view',
  {
    defaultValue: null,
  }
);

// Storage for pending generations - persists across sidepanel close/reopen
export const pendingGenerationsStorage = storage.defineItem<
  PendingGeneration[]
>('local:pending_generations', {
  defaultValue: [],
});

// SSE connection state - tracks if we have an active SSE connection
export const sseConnectionStateStorage = storage.defineItem<SSEConnectionState>(
  'local:sse_connection_state',
  {
    defaultValue: { isConnected: false },
  }
);
