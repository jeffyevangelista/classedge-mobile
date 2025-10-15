import useStore from "@/lib/store";
import { Redirect, Stack } from "expo-router";

export default () => {
  const { authUser } = useStore();

  if (!authUser || authUser.needsPasswordSetup || authUser.needsOnboarding)
    return <Redirect href="/(auth)/login" />;

  return (
    <Stack>
      <Stack.Screen
        name="(dashboard)"
        options={{
          headerTitle: "Dashboard",
        }}
      />
    </Stack>
  );
};
