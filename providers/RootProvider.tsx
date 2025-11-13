import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import useTokenRefresher from "@/hooks/useTokenRefresher";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ImageProvider from "./ImageProvider";
import KeyboardProvider from "./KeyboardProvider";
import QueryProvider from "./QueryProvider";
import ToastProvider from "./ToastProvider";

export default ({ children }: { children: React.ReactNode }) => {
  useTokenRefresher();

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <ImageProvider>
          <GluestackUIProvider>
            <KeyboardProvider>
              <QueryProvider>
                <ToastProvider>{children}</ToastProvider>
              </QueryProvider>
            </KeyboardProvider>
          </GluestackUIProvider>
        </ImageProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
