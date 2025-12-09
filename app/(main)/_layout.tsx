import BackButton from "@/components/back-button";
import useStore from "@/lib/store";
import { Stack } from "expo-router";

export default function MainLayout() {
  const { authUser } = useStore();

  console.log(authUser);

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerShown: false,
        headerLeft: ({ tintColor }) => <BackButton tintColor={tintColor} />,
        headerStyle: {
          backgroundColor: "#f9f9f9",
        },
      }}
    >
      <Stack.Protected guard={!!authUser?.needsPasswordSetup}>
        <Stack.Screen name="setup-password" />
      </Stack.Protected>

      <Stack.Protected guard={!authUser?.needsPasswordSetup}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="course" />
        <Stack.Screen
          name="material/[materialId]/index"
          options={{ headerShown: true, title: "Lesson" }}
        />
        <Stack.Screen
          name="assessment/[assessmentId]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="profile" />
        <Stack.Screen name="announcements" />
      </Stack.Protected>
    </Stack>
  );
}
