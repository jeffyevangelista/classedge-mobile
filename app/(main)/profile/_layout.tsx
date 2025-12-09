import BackButton from "@/components/back-button";
import LogoutButton from "@/features/auth/components/LogoutButton";
import { Stack } from "expo-router";

export default () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f9f9f9",
        },
        headerShadowVisible: false,
        headerLeft: ({ tintColor }) => <BackButton tintColor={tintColor} />,
        headerTintColor: "#2287d5",
        headerTitleStyle: {
          color: "#000",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Profile", headerRight: () => <LogoutButton /> }}
      />
      <Stack.Screen
        name="profile-info"
        options={{
          title: "Profile Information",
        }}
      />
      <Stack.Screen
        name="academic-records"
        options={{
          title: "Academic Records",
        }}
      />
      <Stack.Screen
        name="class-schedule"
        options={{
          title: "Class Schedule",
        }}
      />
    </Stack>
  );
};
