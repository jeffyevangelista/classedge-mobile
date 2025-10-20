import EnterPassword from "@/assets/images/illustrations/forgot-password/enter-password.svg";
import Screen from "@/components/screen";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import PasswordResetForm from "@/features/auth/components/PasswordResetForm";
import { Link } from "expo-router";
import { StyleSheet, useWindowDimensions } from "react-native";

const PasswordResetScreen = () => {
  const { height, width } = useWindowDimensions();
  const verticalSpacing = height > 800 ? 64 : 32;

  return (
    <Screen withPadding={false} safeArea>
      <Box
        style={[
          styles.container,
          { paddingTop: verticalSpacing, paddingBottom: verticalSpacing / 2 },
        ]}
      >
        {/* Illustration */}
        <EnterPassword
          width={width * 0.7}
          height={height * 0.2}
          style={styles.image}
        />

        {/* Title */}
        <Text className="text-2xl font-semibold mb-2 text-center">
          Set a New Password
        </Text>

        {/* Subtitle */}
        <Text className="text-gray-500 text-center mb-8 max-w-md self-center">
          Create a new, more secure password to protect your account
        </Text>

        {/* Form */}
        <PasswordResetForm />

        {/* Cancel Button */}
        <Link href="/(auth)/login" asChild>
          <Button
            variant="link"
            action="neutral"
            className="mx-auto mt-6 w-[80%] max-w-md self-center"
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
        </Link>
      </Box>
    </Screen>
  );
};

export default PasswordResetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 24,
  },
  image: {
    marginBottom: 40,
  },
});
