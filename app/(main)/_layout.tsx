import useStore from "@/lib/store";
import { Redirect, Stack } from "expo-router";

export default () => {
  const { authUser } = useStore();

  if (!authUser) return <Redirect href="/(auth)/login" />;

  if (authUser.needsPasswordSetup && authUser.needsOnboarding)
    return <Redirect href="/(auth)/setup-password" />;

  if (authUser.needsOnboarding)
    return <Redirect href="/(auth)/onboarding" />;

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
