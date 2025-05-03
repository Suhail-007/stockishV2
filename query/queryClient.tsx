import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000
      }
    }
  });
}

export default function TanStackQueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = makeQueryClient();
  useReactQueryDevTools(queryClient);
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
