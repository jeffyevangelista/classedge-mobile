import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { getASData } from "@/lib/storage/async-storage";
import useStore from "@/lib/store";
import RootProvider from "@/providers/RootProvider";
import { ASYNC_STORAGE_KEYS } from "@/utils/storage-keys";
import { Poppins_100Thin } from "@expo-google-fonts/poppins/100Thin";
import { Poppins_100Thin_Italic } from "@expo-google-fonts/poppins/100Thin_Italic";
import { Poppins_200ExtraLight } from "@expo-google-fonts/poppins/200ExtraLight";
import { Poppins_200ExtraLight_Italic } from "@expo-google-fonts/poppins/200ExtraLight_Italic";
import { Poppins_300Light } from "@expo-google-fonts/poppins/300Light";
import { Poppins_300Light_Italic } from "@expo-google-fonts/poppins/300Light_Italic";
import { Poppins_400Regular } from "@expo-google-fonts/poppins/400Regular";
import { Poppins_400Regular_Italic } from "@expo-google-fonts/poppins/400Regular_Italic";
import { Poppins_500Medium } from "@expo-google-fonts/poppins/500Medium";
import { Poppins_500Medium_Italic } from "@expo-google-fonts/poppins/500Medium_Italic";
import { Poppins_600SemiBold } from "@expo-google-fonts/poppins/600SemiBold";
import { Poppins_600SemiBold_Italic } from "@expo-google-fonts/poppins/600SemiBold_Italic";
import { Poppins_700Bold } from "@expo-google-fonts/poppins/700Bold";
import { Poppins_700Bold_Italic } from "@expo-google-fonts/poppins/700Bold_Italic";
import { Poppins_800ExtraBold } from "@expo-google-fonts/poppins/800ExtraBold";
import { Poppins_800ExtraBold_Italic } from "@expo-google-fonts/poppins/800ExtraBold_Italic";
import { Poppins_900Black } from "@expo-google-fonts/poppins/900Black";
import { Poppins_900Black_Italic } from "@expo-google-fonts/poppins/900Black_Italic";
import { useFonts } from "@expo-google-fonts/poppins/useFonts";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const { restoreSession, isAuthenticated, authUser } = useStore();
  const [sessionRestored, setSessionRestored] = useState(false);
  const [hasSeenIntro, setHasSeenIntro] = useState<boolean | null>(null);

  let [loaded, error] = useFonts({
    "Poppins-Thin": Poppins_100Thin,
    "Poppins-ThinItalic": Poppins_100Thin_Italic,
    "Poppins-ExtraLight": Poppins_200ExtraLight,
    "Poppins-ExtraLightItalic": Poppins_200ExtraLight_Italic,
    "Poppins-Light": Poppins_300Light,
    "Poppins-LightItalic": Poppins_300Light_Italic,
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-RegularItalic": Poppins_400Regular_Italic,
    "Poppins-Medium": Poppins_500Medium,
    "Poppins-MediumItalic": Poppins_500Medium_Italic,
    "Poppins-SemiBold": Poppins_600SemiBold,
    "Poppins-SemiBoldItalic": Poppins_600SemiBold_Italic,
    "Poppins-Bold": Poppins_700Bold,
    "Poppins-BoldItalic": Poppins_700Bold_Italic,
    "Poppins-ExtraBold": Poppins_800ExtraBold,
    "Poppins-ExtraBoldItalic": Poppins_800ExtraBold_Italic,
    "Poppins-Black": Poppins_900Black,
    "Poppins-BlackItalic": Poppins_900Black_Italic,
  });

  useEffect(() => {
    const initialize = async () => {
      await restoreSession();
      setSessionRestored(true);
      const seen = await getASData(ASYNC_STORAGE_KEYS.HAS_SEEN_INTRO);
      setHasSeenIntro(seen === true);
    };
    initialize();
  }, [restoreSession]);

  useEffect(() => {
    if ((loaded || error) && sessionRestored && hasSeenIntro !== null) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error, sessionRestored, hasSeenIntro]);

  useEffect(() => {
    if (hasSeenIntro === false && sessionRestored && (loaded || error)) {
      router.replace("/intro");
    }
  }, [hasSeenIntro, sessionRestored, loaded, error, router]);

  if ((!loaded && !error) || !sessionRestored || hasSeenIntro === null) {
    return null; // still loading fonts/session/intro status
  }

  return (
    <SafeAreaProvider>
      <GluestackUIProvider>
        <RootProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Protected
              guard={
                !isAuthenticated ||
                !!authUser?.needsPasswordSetup ||
                !!authUser?.needsOnboarding
              }
            >
              <Stack.Screen name="(auth)" />
            </Stack.Protected>
            <Stack.Protected
              guard={
                isAuthenticated &&
                !authUser?.needsPasswordSetup &&
                !authUser?.needsOnboarding
              }
            >
              <Stack.Screen name="(main)" />
            </Stack.Protected>
            <Stack.Screen name="intro/index" />
          </Stack>
          <StatusBar style="auto" />
        </RootProvider>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}
