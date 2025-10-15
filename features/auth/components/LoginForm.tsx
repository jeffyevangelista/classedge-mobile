import { Link } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useLogin } from "../auth.hooks";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mutateAsync: login, isPending, isError, error } = useLogin();
  const handleLogin = async () => {
    await login({ username, password });
  };

  return (
    <View style={{ padding: 10 }}>
      {isError && <Text>{error.message}</Text>}
      <TextInput
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 10 }}
      />
      <Link style={{ marginLeft: "auto" }} href="/forgot-password">
        Forgot Password?
      </Link>
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 10 }}
      />
      <Button onPress={handleLogin} title="Login" disabled={isPending} />
    </View>
  );
};

export default LoginForm;
