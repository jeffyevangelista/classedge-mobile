import { Stack } from "expo-router";
import React from "react";

const ForgotPasswordLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="otp-verification" />
      <Stack.Screen name="password-reset" />
    </Stack>
  );
};

export default ForgotPasswordLayout;
