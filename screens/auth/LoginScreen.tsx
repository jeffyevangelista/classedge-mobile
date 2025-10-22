import LoginForm from "@/features/auth/components/LoginForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default () => {
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      bottomOffset={65}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <LoginForm />
    </KeyboardAwareScrollView>
  );
};
