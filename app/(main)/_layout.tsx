import useStore from "@/lib/store";
import { Stack } from "expo-router";

export default function MainLayout() {
  const { authUser, expiresAt } = useStore();

  console.log({ expiresAt }, typeof expiresAt);

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
        <Stack.Screen name="course" />
        <Stack.Screen
          name="material/[id]/index"
          options={{ headerShown: true, title: "Lesson" }}
        />
      </Stack.Protected>
    </Stack>
  );
}
