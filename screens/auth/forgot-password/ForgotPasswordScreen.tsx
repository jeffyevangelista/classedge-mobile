import ForgotPassword from "@/assets/images/illustrations/forgot-password/forgot-password.svg";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";
import { useRouter } from "expo-router";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const ForgotPasswordScreen = () => {
  const { height, width } = useWindowDimensions();
  const verticalSpacing = height > 800 ? 64 : 32;
  const router = useRouter();

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      bottomOffset={65}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "#f9f9f9" }}
    >
      <View
        style={[
          styles.container,
          { paddingTop: verticalSpacing, paddingBottom: verticalSpacing / 2 },
        ]}
      >
        <ForgotPassword
          width={width * 0.7}
          height={height * 0.2}
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

        <Button
          onPress={() => router.back()}
          action="neutral"
          variant="link"
          className="mx-auto mt-6 w-[80%] max-w-md self-center"
        >
          <ButtonText>Back to Login</ButtonText>
        </Button>
      </View>
    </KeyboardAwareScrollView>
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
    marginBottom: 40,
  },
});
