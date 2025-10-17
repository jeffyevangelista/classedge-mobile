import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Link } from "expo-router";
import React from "react";
import { useWindowDimensions } from "react-native";

const OTPVerificationForm = () => {
  const { height } = useWindowDimensions();
  const isLarge = height > 800;

  return (
    <Box className="w-full max-w-md mx-auto self-center gap-4">
      {/* OTP Input */}
      <Input size={isLarge ? "xl" : "lg"}>
        <InputField
          placeholder="Enter 6-digit code"
          keyboardType="numeric"
          maxLength={6}
          textAlign="center"
        />
      </Input>

      {/* Resend Section */}
      <Box className="flex-row items-center justify-center mt-2">
        <Text className="text-gray-500">Didn’t receive the code? </Text>
        <Button variant="link" size={isLarge ? "xl" : "lg"}>
          <ButtonText>Resend</ButtonText>
        </Button>
      </Box>

      {/* Verify Button */}
      <Link href="/forgot-password/password-reset" asChild>
        <Button size={isLarge ? "xl" : "lg"} className="mt-4">
          <ButtonText>Verify</ButtonText>
        </Button>
      </Link>
    </Box>
  );
};

export default OTPVerificationForm;
