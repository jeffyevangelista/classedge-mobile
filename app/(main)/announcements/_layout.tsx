import { Stack } from "expo-router";

export default () => (
  <Stack
    screenOptions={{
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: "#f9f9f9",
      },
    }}
  >
    <Stack.Screen name="index" options={{ headerTitle: "Announcements" }} />
    <Stack.Screen
      name="[id]"
      options={{ headerTitle: "Announcement Detail" }}
    />
  </Stack>
);
