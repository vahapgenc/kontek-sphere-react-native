// TanStack Query client. Data flows through hooks that read mocks while
// USE_MOCKS is true; flip to the real /api/v1 gateway later without touching screens.
import { QueryClient } from '@tanstack/react-query';

export const USE_MOCKS = true;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, retry: USE_MOCKS ? false : 2, refetchOnWindowFocus: false },
  },
});
