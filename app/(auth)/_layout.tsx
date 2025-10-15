import useStore from "@/lib/store";
import { Stack } from "expo-router";

export default () => {
  const { authUser } = useStore();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Regular auth screens when not logged in or setup complete */}
      <Stack.Protected
        guard={
          !authUser ||
          (!authUser.needsPasswordSetup && !authUser.needsOnboarding)
        }
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="forgot-password/index" />
        <Stack.Screen name="forgot-password/otp-verification" />
        <Stack.Screen name="forgot-password/password-reset" />
        <Stack.Screen name="forgot-password/reset-success" />
      </Stack.Protected>

      {/* Password setup - first priority */}
      <Stack.Protected guard={!!authUser?.needsPasswordSetup}>
        <Stack.Screen
          name="setup-password"
          options={{ headerTitle: "Password Setup" }}
        />
      </Stack.Protected>

      {/* Onboarding - after password setup */}
      <Stack.Protected
        guard={!!authUser?.needsOnboarding && !authUser?.needsPasswordSetup}
      >
        <Stack.Screen
          name="onboarding"
          options={{ headerTitle: "Onboarding" }}
        />
      </Stack.Protected>
    </Stack>
  );
};
