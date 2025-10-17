import Screen from "@/components/screen";
import LoginForm from "@/features/auth/components/LoginForm";
import { storeASData } from "@/lib/storage/async-storage";
import { ASYNC_STORAGE_KEYS } from "@/utils/storage-keys";

export default () => {
  const resetIntro = async () => {
    await storeASData(ASYNC_STORAGE_KEYS.HAS_SEEN_INTRO, "false");
  };
  return (
    <Screen safeArea={true} withPadding={false}>
      <LoginForm />
      {/* <Button title="Reset Intro" onPress={resetIntro} /> */}
    </Screen>
  );
};
