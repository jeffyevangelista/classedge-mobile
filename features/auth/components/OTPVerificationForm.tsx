import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Link } from "expo-router";
import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { OtpInput } from "react-native-otp-entry";

const OTPVerificationForm = () => {
  const { height } = useWindowDimensions();
  const isLarge = height > 800;
  const [value, setValue] = useState("");

  const handleVerify = async () => {
    console.log(value);
  };

  return (
    <Box className="w-full max-w-md mx-auto self-center gap-4">
      {/* OTP Input */}
      <OtpInput
        focusColor={"#146ab5"}
        numberOfDigits={6}
        onTextChange={(text) => setValue(text)}
        theme={{
          focusStickStyle: {
            height: 30,
          },
        }}
      />

      {/* Resend Section */}
      <Box className="flex-row items-center justify-center mt-2">
        <Text className="text-gray-500">Didn’t receive the code? </Text>
        <Button variant="link" size={isLarge ? "lg" : "md"}>
          <ButtonText>Resend</ButtonText>
        </Button>
      </Box>

      {/* Verify Button */}
      <Link href="/forgot-password/password-reset" asChild>
        <Button
          onPress={handleVerify}
          size={isLarge ? "xl" : "lg"}
          className="mt-4"
        >
          <ButtonText>Verify</ButtonText>
        </Button>
      </Link>
    </Box>
  );
};

export default OTPVerificationForm;
