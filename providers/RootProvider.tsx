import { GestureHandlerRootView } from "react-native-gesture-handler";
import CopilotProvider from "./CopilotProvider";
import KeyboardProvider from "./KeyboardProvider";
import QueryProvider from "./QueryProvider";
import ToastProvider from "./ToastProvider";

export default ({ children }: { children: React.ReactNode }) => (
  <GestureHandlerRootView>
    <KeyboardProvider>
      <QueryProvider>
        <CopilotProvider>
          <ToastProvider>{children}</ToastProvider>
        </CopilotProvider>
      </QueryProvider>
    </KeyboardProvider>
  </GestureHandlerRootView>
);
