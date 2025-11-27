import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DevToolsBubble } from "react-native-react-query-devtools";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes - data stays fresh for this duration
      gcTime: 1000 * 60 * 10, // 10 minutes - cached data kept in memory
      refetchOnMount: false, // Don't refetch on mount if data is fresh
      refetchOnWindowFocus: false, // Don't refetch on window focus (important for React Native)
      retry: 1, // Only retry failed requests once
    },
  },
});

export default ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <DevToolsBubble queryClient={queryClient} />
  </QueryClientProvider>
);
