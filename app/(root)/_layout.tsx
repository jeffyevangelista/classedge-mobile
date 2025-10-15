import useStore from "@/lib/store";
import { Stack } from "expo-router";

export default () => {
  const { isAuthenticated } = useStore();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="index" />
      </Stack.Protected>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(protected)" />
      </Stack.Protected>
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
};
