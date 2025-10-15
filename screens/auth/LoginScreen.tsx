import LoginForm from "@/features/auth/components/LoginForm";
import MSAuthButton from "@/features/auth/components/MSAuthButton";
import { SafeAreaView } from "react-native-safe-area-context";

export default () => (
  <SafeAreaView>
    <LoginForm />
    <MSAuthButton />
  </SafeAreaView>
);
