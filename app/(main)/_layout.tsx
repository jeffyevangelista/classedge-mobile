import useStore from "@/lib/store";
import { Stack } from "expo-router";

export default function MainLayout() {
  const { authUser } = useStore();

  console.log("is string?", typeof authUser, authUser);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Protected guard={!!authUser?.needsPasswordSetup}>
        <Stack.Screen name="setup-password" />
      </Stack.Protected>

      <Stack.Protected guard={!authUser?.needsPasswordSetup}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
    </Stack>
  );
}
