import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { Box } from "@/components/ui/box";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput, useWindowDimensions } from "react-native";
import { ExclamationCircleIcon } from "react-native-heroicons/outline";
import { useForgotPassword } from "../auth.hooks";
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from "../auth.schemas";

const ForgotPasswordForm = () => {
  const { height } = useWindowDimensions();
  const inputRef = useRef<React.ComponentRef<typeof TextInput>>(null);
  const {
    mutateAsync: forgotPassword,
    isPending,
    isError,
    error,
  } = useForgotPassword();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  useFocusEffect(
    useCallback(() => {
      // Delay to ensure input is mounted before focusing
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }, [])
  );

  const handleForgotPassword = async (data: ForgotPasswordFormValues) => {
    await forgotPassword({ email: data.email });
    router.replace("/forgot-password/otp-verification");
  };

  return (
    <Box className="w-full gap-4 max-w-md mx-auto self-center">
      {isError && (
        <Alert action="error">
          <AlertIcon as={ExclamationCircleIcon} />
          <AlertText>{error.message}</AlertText>
        </Alert>
      )}
      <FormControl isInvalid={!!errors.email}>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input size={height > 800 ? "xl" : "lg"}>
              <InputField
                ref={inputRef as any}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="juandelacruz@hccci.edu.ph"
                value={value}
                onChangeText={onChange}
              />
            </Input>
          )}
        />
        {errors.email && (
          <FormControlError>
            <FormControlErrorText>{errors.email.message}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      <Button
        isDisabled={isPending}
        onPress={handleSubmit(handleForgotPassword)}
        size={height > 800 ? "xl" : "lg"}
      >
        {isPending ? <ButtonSpinner /> : <ButtonText>Send Code</ButtonText>}
      </Button>
    </Box>
  );
};

export default ForgotPasswordForm;
