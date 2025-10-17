import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Link } from "expo-router";
import React from "react";
import { useWindowDimensions } from "react-native";

const ForgotPasswordForm = () => {
  const { height } = useWindowDimensions();
  return (
    <Box className="w-full max-w-md mx-auto self-center">
      <Input size={height > 800 ? "xl" : "lg"}>
        <InputField placeholder="Email" />
      </Input>

      <Link href="/forgot-password/otp-verification" asChild>
        <Button size={height > 800 ? "xl" : "lg"} className="mt-2">
          <ButtonText>Send Code</ButtonText>
        </Button>
      </Link>
    </Box>
  );
};

export default ForgotPasswordForm;
