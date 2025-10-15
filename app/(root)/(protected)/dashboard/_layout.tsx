import { Stack } from "expo-router";

export default () => (
  <Stack>
    <Stack.Screen name="index" options={{ headerTitle: "Dashboard" }} />
  </Stack>
);
