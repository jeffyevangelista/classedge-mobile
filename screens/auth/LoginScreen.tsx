import Screen from "@/components/screen";
import LoginForm from "@/features/auth/components/LoginForm";

export default () => {
  return (
    <Screen safeArea={true} withPadding={false}>
      <LoginForm />
    </Screen>
  );
};
