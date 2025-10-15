import { Link } from "expo-router";
import React from "react";
import { Button, Text, TextInput, View } from "react-native";

const OTPVerificationForm = () => {
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
        Please Check your Email
      </Text>
      <Text style={{ marginBottom: 10, marginHorizontal: "auto" }}>
        we have sent the code to @emailAddressHere
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 10,
        }}
        placeholder="Enter OTP"
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{}}>Didn't received the code?</Text>
        <Button title="Resend" />
      </View>
      <Link href="/forgot-password/password-reset" asChild>
        <Button title="Verify" />
      </Link>
    </View>
  );
};

export default OTPVerificationForm;
