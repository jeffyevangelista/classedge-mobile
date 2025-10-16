import Screen from "@/components/screen";
import LoginForm from "@/features/auth/components/LoginForm";
import MSAuthButton from "@/features/auth/components/MSAuthButton";
import { storeASData } from "@/lib/storage/async-storage";
import { ASYNC_STORAGE_KEYS } from "@/utils/storage-keys";
import { Button } from "react-native";

export default () => {
  const resetIntro = async () => {
    await storeASData(ASYNC_STORAGE_KEYS.HAS_SEEN_INTRO, false);
  };

  return (
    <Screen safeArea={true}>
      <LoginForm />
      <MSAuthButton />

      <Button title="reset intro" onPress={resetIntro} />
    </Screen>
  );
};
