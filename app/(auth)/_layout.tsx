import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="forgot-password/index" />
      <Stack.Screen name="forgot-password/otp-verification" />
      <Stack.Screen name="forgot-password/password-reset" />
      <Stack.Screen name="forgot-password/reset-success" />
    </Stack>
  );
}
