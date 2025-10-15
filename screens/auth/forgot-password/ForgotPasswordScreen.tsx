import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgotPasswordScreen = () => {
  return (
    <SafeAreaView>
      <ForgotPasswordForm />
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
