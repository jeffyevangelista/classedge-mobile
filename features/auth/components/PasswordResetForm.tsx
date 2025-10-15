import { Link } from "expo-router";
import React from "react";
import { Button, Text, TextInput, View } from "react-native";

const PasswordResetForm = () => {
  return (
    <View style={{ padding: 10 }}>
      <Text
        style={{
          marginHorizontal: "auto",
          fontSize: 24,
          fontWeight: 700,
          marginBottom: 10,
        }}
      >
        Set new password
      </Text>
      <Text style={{ marginBottom: 10, marginHorizontal: "auto" }}>
        Create a new and more secure password
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 10,
        }}
        placeholder="Enter New Password"
      />
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 10,
        }}
        placeholder="Confirm New Password"
      />
      <Link href="/forgot-password/reset-success" asChild>
        <Button title="Reset Password" />
      </Link>
      <Link href="/(root)" asChild>
        <Text>Cancel</Text>
      </Link>
    </View>
  );
};

export default PasswordResetForm;
