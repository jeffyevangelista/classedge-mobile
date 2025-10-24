import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { Box } from "@/components/ui/box";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useWindowDimensions } from "react-native";
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "react-native-heroicons/outline";
import { useLogin } from "../auth.hooks";
import { LoginFormValues, loginSchema } from "../auth.schemas";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutateAsync: login, isPending, isError, error } = useLogin();
  const { height } = useWindowDimensions();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const handleLogin = async (data: LoginFormValues) => {
    await login(data);
  };

  return (
    <Box className="w-full gap-5">
      {isError && (
        <Alert action="error">
          <AlertIcon as={ExclamationCircleIcon} />
          <AlertText>{error.message}</AlertText>
        </Alert>
      )}

      <FormControl isInvalid={!!errors.username}>
        <FormControlLabel>
          <FormControlLabelText>Email</FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value } }) => (
            <Input size={height > 800 ? "xl" : "lg"}>
              <InputField
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="juandelacruz@hccci.edu.ph"
                value={value}
                onChangeText={onChange}
              />
            </Input>
          )}
        />
        {errors.username && (
          <FormControlError>
            <FormControlErrorText>
              {errors.username.message}
            </FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      <FormControl isInvalid={!!errors.password}>
        <FormControlLabel>
          <FormControlLabelText>Password</FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input size={height > 800 ? "xl" : "lg"}>
              <InputField
                value={value}
                onChangeText={onChange}
                secureTextEntry={!showPassword}
              />
              <InputSlot
                className="pr-3"
                onPress={() => setShowPassword((s) => !s)}
              >
                <InputIcon as={showPassword ? EyeIcon : EyeSlashIcon} />
              </InputSlot>
            </Input>
          )}
        />
        {errors.password && (
          <FormControlError>
            <FormControlErrorText>
              {errors.password.message}
            </FormControlErrorText>
          </FormControlError>
        )}
        <Link href="/forgot-password" className="self-end mt-2" asChild>
          <Button variant="link">
            <ButtonText>Forgot Password?</ButtonText>
          </Button>
        </Link>
      </FormControl>

      <Button
        size={height > 800 ? "xl" : "lg"}
        onPress={handleSubmit(handleLogin)}
        isDisabled={isPending}
        className="mt-2"
      >
        {isPending ? <ButtonSpinner /> : <ButtonText>Login</ButtonText>}
      </Button>
    </Box>
  );
};

export default LoginForm;
