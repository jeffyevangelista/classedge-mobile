import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DevToolsBubble } from "react-native-react-query-devtools";

export const queryClient = new QueryClient({});

export default ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <DevToolsBubble queryClient={queryClient} />
  </QueryClientProvider>
);
