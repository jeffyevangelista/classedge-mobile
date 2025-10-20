import Screen from "@/components/screen";
import SetupPasswordForm from "@/features/auth/components/SetupPasswordForm";
import { useWindowDimensions } from "react-native";

const SetupPasswordScreen = () => {
  const { height } = useWindowDimensions();
  const verticalPadding = height > 800 ? 64 : 30;
  return (
    <Screen withPadding={false} safeArea={true}>
      <SetupPasswordForm />
    </Screen>
  );
};

export default SetupPasswordScreen;
