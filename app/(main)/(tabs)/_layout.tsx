import LogoutButton from "@/features/auth/components/LogoutButton";
import { Tabs } from "expo-router";

export default () => (
  <Tabs
    screenOptions={{
      headerRight: () => <LogoutButton />,
    }}
  >
    <Tabs.Screen name="index" options={{ title: "Home" }} />
    <Tabs.Screen name="calendar" options={{ title: "Calendar" }} />
    <Tabs.Screen name="subjects" options={{ title: "Subjects" }} />
    <Tabs.Screen name="messages" options={{ title: "Messages" }} />
    <Tabs.Screen name="notifications" options={{ title: "Notifications" }} />
  </Tabs>
);
