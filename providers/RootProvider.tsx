import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import useTokenRefresher from "@/hooks/useTokenRefresher";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CopilotProvider from "./CopilotProvider";
import KeyboardProvider from "./KeyboardProvider";
import QueryProvider from "./QueryProvider";
import ToastProvider from "./ToastProvider";

export default ({ children }: { children: React.ReactNode }) => {
  useTokenRefresher();

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <GluestackUIProvider>
          <KeyboardProvider>
            <QueryProvider>
              <CopilotProvider>
                <ToastProvider>{children}</ToastProvider>
              </CopilotProvider>
            </QueryProvider>
          </KeyboardProvider>
        </GluestackUIProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
