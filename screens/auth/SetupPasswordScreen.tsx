import SecureLogin from "@/assets/images/illustrations/intro/secure-login.svg";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import SetupPasswordForm from "@/features/auth/components/SetupPasswordForm";
import { StyleSheet, useWindowDimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const SetupPasswordScreen = () => {
  const { height, width } = useWindowDimensions();
  const verticalPadding = height > 800 ? 64 : 30;
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      bottomOffset={65}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <Box
        style={[
          styles.container,
          { paddingTop: verticalPadding, paddingBottom: verticalPadding / 2 },
        ]}
      >
        <SecureLogin
          width={width * 0.7}
          height={height * 0.2}
          style={styles.image}
        />
        <Heading className="text-2xl font-semibold mb-2 text-center">
          Setup password
        </Heading>

        {/* Subtitle */}
        <Text className="text-gray-500 text-center mb-8 max-w-md self-center">
          Secure your account by creating a strong password.
        </Text>
        <SetupPasswordForm />
      </Box>
    </KeyboardAwareScrollView>
  );
};

export default SetupPasswordScreen;

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
