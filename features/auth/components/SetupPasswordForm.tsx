import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

const SetupPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View
      style={{
        marginHorizontal: 10,
        gap: 10,
        paddingVertical: 20,
      }}
    >
      <View>
        <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "700" }}>
          Set a Password{" "}
        </Text>
        <Text style={{ textAlign: "center", fontSize: 16 }}>
          Create a secure password to continue{" "}
        </Text>
      </View>

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 10 }}
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 10 }}
      />

      <Button title="Continue" onPress={() => {}} />
    </View>
  );
};

export default SetupPasswordForm;
