import LogoutButton from "@/features/auth/components/LogoutButton";
import useStore from "@/lib/store";
import { View } from "react-native";

export default () => {
  const { authUser } = useStore();

  console.log(authUser);

  return (
    <View>
      <LogoutButton />
    </View>
  );
};
