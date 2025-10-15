import useStore from "@/lib/store";
import { Redirect, Stack } from "expo-router";

export default () => {
  const { authUser } = useStore();

  if (!authUser) return <Redirect href="/" />;

  return (
    <Stack>
      <Stack.Protected guard={authUser.needsPasswordSetup}>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Password Setup",
          }}
        />
      </Stack.Protected>

      <Stack.Protected
        guard={authUser.needsOnboarding && !authUser.needsPasswordSetup}
      >
        <Stack.Screen
          name="onboarding"
          options={{
            headerTitle: "Onboarding",
          }}
        />
      </Stack.Protected>
      <Stack.Protected
        guard={!authUser.needsOnboarding && !authUser.needsPasswordSetup}
      >
        <Stack.Screen
          name="(dashboard)"
          options={{
            headerTitle: "Dashboard",
          }}
        />
      </Stack.Protected>
    </Stack>
  );
};
