import { useSyncExternalStore, useCallback } from 'react';
import { api } from '@/lib/api';

interface GenerationData {
  id?: string;
  imageUrl?: string;
}

interface SSEState {
  generations: GenerationData[];
  isConnected: boolean;
  error: string | null;
}

let eventSource: EventSource | null = null;
let state: SSEState = {
  generations: [],
  isConnected: false,
  error: null,
};

const listeners = new Set<() => void>();

const notifyListeners = () => {
  listeners.forEach((listener) => listener());
};

const updateState = (newState: Partial<SSEState>) => {
  state = { ...state, ...newState };
  notifyListeners();
};

export const useSSEGeneration = () => {
  const sseState = useSyncExternalStore(
    (onChange) => {
      listeners.add(onChange);
      return () => {
        listeners.delete(onChange);
      };
    },
    () => state
  );

  const connect = useCallback(() => {
    // Don't reconnect if already connected
    if (eventSource && eventSource.readyState !== EventSource.CLOSED) {
      return;
    }

    // Close existing connection if any
    if (eventSource) {
      eventSource.close();
    }

    // Reset state
    updateState({
      generations: [],
      isConnected: false,
      error: null,
    });

    try {
      // Create new EventSource with credentials
      eventSource = new EventSource(api.endpoints.sseGeneration, {
        withCredentials: true,
      });

      eventSource.onopen = () => {
        updateState({ isConnected: true, error: null });
      };

      // Listen for 'generation' events
      eventSource.addEventListener('generation', (event) => {
        try {
          const data: GenerationData = JSON.parse(event.data);
          if (data && data.imageUrl) {
            updateState({
              generations: [...state.generations, data],
            });
          }
        } catch (err) {
          console.error('Failed to parse generation data:', err);
        }
      });

      // Listen for 'close_connection' events
      eventSource.addEventListener('close_connection', () => {
        updateState({ isConnected: false });
        if (eventSource) {
          eventSource.close();
          eventSource = null;
        }
      });

      eventSource.onerror = (error) => {
        console.error('SSE Error:', error);
        updateState({
          isConnected: false,
          error: 'Connection to server lost',
        });
        if (eventSource) {
          eventSource.close();
          eventSource = null;
        }
      };
    } catch (err) {
      updateState({
        error: err instanceof Error ? err.message : 'Failed to connect to SSE',
      });
    }
  }, []);

  const disconnect = useCallback(() => {
    if (eventSource) {
      eventSource.close();
      eventSource = null;
      updateState({ isConnected: false });
    }
  }, []);

  const reset = useCallback(() => {
    disconnect();
    updateState({
      generations: [],
      isConnected: false,
      error: null,
    });
  }, [disconnect]);

  return {
    ...sseState,
    connect,
    disconnect,
    reset,
  };
};

