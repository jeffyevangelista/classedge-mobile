import AppLogo from "@/assets/images/app-logo.svg";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import LoginForm from "@/features/auth/components/LoginForm";
import MSAuthButton from "@/features/auth/components/MSAuthButton";
import { useWindowDimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default () => {
  const { height } = useWindowDimensions();
  const verticalPadding = height > 800 ? 64 : 30;

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      bottomOffset={65}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "#f9f9f9" }}
    >
      <Box
        style={{ paddingTop: verticalPadding }}
        className={`flex-1 items-center justify-start px-6`}
      >
        <Box className="w-full max-w-md">
          <Box className="items-center mb-10">
            <AppLogo width={112} height={112} style={{ marginBottom: 6 }} />
            <Heading className="text-2xl font-semibold mb-1 text-center">
              Welcome to Classedge
            </Heading>
            <Text className="text-gray-500 text-center">
              A learning platform of HCCCI
            </Text>
          </Box>

          <LoginForm />

          {/* Footer Section */}
          <Box className="items-center gap-3 mt-10">
            <Text className="text-gray-500">or continue with</Text>
            <MSAuthButton />
          </Box>
        </Box>
      </Box>
    </KeyboardAwareScrollView>
  );
};
