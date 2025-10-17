import ForgotPassword from "@/assets/images/forgot-password.svg";
import Screen from "@/components/screen";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";
import { Link } from "expo-router";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

const ForgotPasswordScreen = () => {
  const { height, width } = useWindowDimensions();

  // Dynamic vertical padding (larger screens = more breathing room)
  const verticalSpacing = height > 800 ? 64 : 32;

  return (
    <Screen withPadding={false} safeArea>
      <View
        style={[
          styles.container,
          { paddingTop: verticalSpacing, paddingBottom: verticalSpacing / 2 },
        ]}
      >
        <ForgotPassword
          width={width * 0.7}
          height={height * 0.35}
          style={styles.image}
        />

        <Heading className="text-2xl font-semibold mb-2 text-center">
          Forgot Password?
        </Heading>
        <Text className="text-gray-500 text-center mb-8 max-w-md self-center">
          No worries! Enter your email address below and we’ll send you reset
          instructions.
        </Text>

        <ForgotPasswordForm />

        <Link href="/(auth)/login" asChild>
          <Button
            action="neutral"
            variant="link"
            className="mx-auto mt-6 w-[80%] max-w-md self-center"
          >
            <ButtonText>Back to Login</ButtonText>
          </Button>
        </Link>
      </View>
    </Screen>
  );
};

export default ForgotPasswordScreen;

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
