import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Link } from "expo-router";
import React from "react";
import { useWindowDimensions } from "react-native";

const PasswordResetForm = () => {
  const { height } = useWindowDimensions();
  const isLarge = height > 800;

  return (
    <Box className="w-full max-w-md mx-auto self-center gap-4">
      {/* New Password */}
      <Input size={isLarge ? "xl" : "lg"}>
        <InputField
          placeholder="Enter new password"
          secureTextEntry
          textContentType="newPassword"
        />
      </Input>

      {/* Confirm Password */}
      <Input size={isLarge ? "xl" : "lg"}>
        <InputField
          placeholder="Confirm new password"
          secureTextEntry
          textContentType="password"
        />
      </Input>

      {/* Submit */}
      <Link href="/forgot-password/reset-success" asChild>
        <Button size={isLarge ? "xl" : "lg"}>
          <ButtonText>Reset Password</ButtonText>
        </Button>
      </Link>
    </Box>
  );
};

export default PasswordResetForm;
