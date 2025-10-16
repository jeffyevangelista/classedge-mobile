import Screen from "@/components/screen";
import LoginForm from "@/features/auth/components/LoginForm";
import MSAuthButton from "@/features/auth/components/MSAuthButton";

export default () => (
  <Screen safeArea={true}>
    <LoginForm />
    <MSAuthButton />
  </Screen>
);
