import useStore from "@/lib/store";
import { Redirect, Stack } from "expo-router";

export default () => {
  const { authUser } = useStore();

  if (authUser?.needsPasswordSetup && authUser?.needsOnboarding)
    return <Redirect href="/(auth)/setup-password" />;

  if (authUser?.needsOnboarding) return <Redirect href="/(auth)/onboarding" />;

  if (!authUser) return <Redirect href="/(auth)/login" />;
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};
