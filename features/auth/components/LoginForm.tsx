import AppLogo from "@/assets/images/app-logo.svg";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Link } from "expo-router";
import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { useLogin } from "../auth.hooks";
import MSAuthButton from "./MSAuthButton";

const LoginForm = () => {
  const { height } = useWindowDimensions();
  const verticalPadding = height > 800 ? 64 : 30;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mutateAsync: login, isPending, isError, error } = useLogin();
  const handleLogin = async () => {
    await login({ username, password });
  };

  return (
    <Box
      style={{ paddingTop: verticalPadding }}
      className={`flex-1 items-center justify-start px-6`}
    >
      <Box className="w-full max-w-md">
        {/* Header Section */}
        <Box className="items-center mb-10">
          <AppLogo width={112} height={112} className="mb-6" />
          <Heading className="text-2xl font-semibold mb-1 text-center">
            Welcome to Classedge
          </Heading>
          <Text className="text-gray-500 text-center">
            A learners platform of HCCCi
          </Text>
        </Box>

        {/* Form Section */}
        <Box className="w-full gap-5">
          {isError && (
            <Alert>
              <AlertIcon />
              <AlertText>{error.message}</AlertText>
            </Alert>
          )}

          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Input size="xl">
              <InputField
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="juandelacruz@hccci.edu.ph"
                value={username}
                onChangeText={setUsername}
              />
            </Input>
          </FormControl>

          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Input size="xl">
              <InputField
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </Input>
            <Link href="/forgot-password" className="self-end mt-2" asChild>
              <Button variant="link">
                <ButtonText>Forgot Password?</ButtonText>
              </Button>
            </Link>
          </FormControl>

          <Button
            size="xl"
            onPress={handleLogin}
            disabled={isPending}
            className="mt-2"
          >
            <ButtonText>Login</ButtonText>
          </Button>
        </Box>

        {/* Footer Section */}
        <Box className="items-center gap-3 mt-10">
          <Text className="text-gray-500">or continue with</Text>
          <MSAuthButton />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
