import { Link } from "expo-router";
import React from "react";
import { Button, Text, TextInput, View } from "react-native";

const ForgotPasswordForm = () => {
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
        Forgot Password?
      </Text>
      <Text style={{ marginBottom: 10, marginHorizontal: "auto" }}>
        No worries, enter you email address and we'll send you reset
        instructions
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 10,
        }}
        placeholder="Email"
      />
      <Link href="/forgot-password/otp-verification" asChild>
        <Button title="Send Code" />
      </Link>
      <Link href="/" asChild>
        <Text>Back to login</Text>
      </Link>
    </View>
  );
};

export default ForgotPasswordForm;
