import React from "react";
import { Button, View } from "react-native";
import { useLogout } from "../auth.hooks";

const LogoutButton = () => {
  const { mutateAsync: logout } = useLogout();
  const handleLogout = () => {
    logout();
  };
  return (
    <View>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default LogoutButton;
