import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { Box } from "@/components/ui/box";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import useStore from "@/lib/store";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { ExclamationCircleIcon } from "react-native-heroicons/outline";
import { OtpInput } from "react-native-otp-entry";
import { toast } from "sonner-native";
import { useForgotPassword, useVerifyOtp } from "../auth.hooks";

const OTPVerificationForm = () => {
  const router = useRouter();
  const { email } = useStore.getState();
  const {
    mutateAsync: verifyOtp,
    isPending: verifyOtpPending,
    isError: verifyOtpIsError,
    error: verifyOtpError,
  } = useVerifyOtp();
  const { mutateAsync: forgotPassword, isPending: forgotPasswordPending } =
    useForgotPassword();
  const { height } = useWindowDimensions();
  const isLarge = height > 800;
  const [value, setValue] = useState("");

  const handleVerify = async () => {
    await verifyOtp({ email: email!, otp: value });
    router.replace("/(auth)/forgot-password/password-reset");
  };

  const handleResend = async () => {
    try {
      await forgotPassword({ email: email! });
      toast.success("OTP has been resent");
    } catch (error) {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <Box className="w-full max-w-md mx-auto self-center gap-4">
      {verifyOtpIsError && (
        <Alert action="error">
          <AlertIcon as={ExclamationCircleIcon} />
          <AlertText>{verifyOtpError.message}</AlertText>
        </Alert>
      )}
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
        <Button
          isDisabled={forgotPasswordPending || verifyOtpPending}
          onPress={handleResend}
          variant="link"
          size={isLarge ? "lg" : "md"}
        >
          <ButtonText>Resend</ButtonText>
        </Button>
      </Box>

      <Button
        isDisabled={verifyOtpPending || forgotPasswordPending}
        onPress={handleVerify}
        size={isLarge ? "xl" : "lg"}
        className="mt-4"
      >
        {verifyOtpPending || forgotPasswordPending ? (
          <ButtonSpinner />
        ) : (
          <ButtonText>Verify</ButtonText>
        )}
      </Button>
    </Box>
  );
};

export default OTPVerificationForm;
