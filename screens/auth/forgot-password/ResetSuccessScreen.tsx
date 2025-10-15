import { Link } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

const SuccessScreen = () => {
  return (
    <View>
      <View>
        <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "700" }}>
          Reset Password Success
        </Text>
        <Text style={{ textAlign: "center", fontSize: 16 }}>
          Now, you can use your new password to login to your account.
        </Text>
      </View>
      <Link href="/" asChild>
        <Button title="Go to Login" />
      </Link>
    </View>
  );
};

export default SuccessScreen;
