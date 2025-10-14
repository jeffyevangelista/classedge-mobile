import useStore from "@/lib/store";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default () => {
  const { restoreSession, accessToken } = useStore();

  useEffect(() => {
    restoreSession();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!accessToken}>
        <Stack.Screen name="index" />
      </Stack.Protected>
      <Stack.Protected guard={!!accessToken}>
        <Stack.Screen name="(protected)" />
      </Stack.Protected>
    </Stack>
  );
};
