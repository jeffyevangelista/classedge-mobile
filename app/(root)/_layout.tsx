import useStore from "@/lib/store";
import { Stack } from "expo-router";

export default () => {
  const { isAuthenticated } = useStore();

  return (
    <Stack>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(protected)" />
      </Stack.Protected>
    </Stack>
  );
};
