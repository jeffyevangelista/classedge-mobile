import MailSent from "@/assets/images/mail-sent.svg";
import Screen from "@/components/screen";
import { Text } from "@/components/ui/text";
import OTPVerificationForm from "@/features/auth/components/OTPVerificationForm";
import { StyleSheet, useWindowDimensions, View } from "react-native";

const OTPVerificationScreen = () => {
  const { height, width } = useWindowDimensions();
  const verticalSpacing = height > 800 ? 64 : 32;

  return (
    <Screen safeArea withPadding={false}>
      <View
        style={[
          styles.container,
          { paddingTop: verticalSpacing, paddingBottom: verticalSpacing / 2 },
        ]}
      >
        {/* Illustration */}
        <MailSent
          width={width * 0.7}
          height={height * 0.35}
          style={styles.image}
        />

        {/* Heading and Text */}
        <Text className="text-2xl font-semibold mb-2 text-center">
          Please Check Your Email
        </Text>
        <Text className="text-gray-500 text-center mb-8 max-w-md self-center">
          We’ve sent a 6-digit verification code to{" "}
          <Text className="font-semibold text-primary-600">
            email@example.com
          </Text>
        </Text>

        {/* Form Section */}
        <View className="w-full max-w-md self-center">
          <OTPVerificationForm />
        </View>
      </View>
    </Screen>
  );
};

export default OTPVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 24,
  },
  image: {
    marginBottom: 24,
  },
});
