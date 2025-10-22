import { GestureHandlerRootView } from "react-native-gesture-handler";
import KeyboardProvider from "./KeyboardProvider";
import QueryProvider from "./QueryProvider";

export default ({ children }: { children: React.ReactNode }) => (
  <GestureHandlerRootView>
    <KeyboardProvider>
      <QueryProvider>{children}</QueryProvider>
    </KeyboardProvider>
  </GestureHandlerRootView>
);
