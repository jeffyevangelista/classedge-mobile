import BackButton from "@/components/back-button";
import { Stack } from "expo-router";

export default () => (
  <Stack
    screenOptions={{
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: "#f9f9f9",
      },
      headerTitleStyle: {
        color: "#000",
      },
      headerTintColor: "#2287d5",
      headerLeft: ({ tintColor }) => <BackButton tintColor={tintColor} />,
    }}
  >
    <Stack.Screen name="index" options={{ headerTitle: "Announcements" }} />
    <Stack.Screen
      name="[id]"
      options={{ headerTitle: "Announcement Detail" }}
    />
  </Stack>
);
