import QueryProvider from "./QueryProvider";

export default ({ children }: { children: React.ReactNode }) => (
  <QueryProvider>{children}</QueryProvider>
);
