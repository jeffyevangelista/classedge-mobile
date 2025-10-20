import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useWindowDimensions } from "react-native";
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from "../auth.schemas";

const ForgotPasswordForm = () => {
  const { height } = useWindowDimensions();
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

  const handleForgotPassowrd = async (data: ForgotPasswordFormValues) => {
    console.log(data);
  };

  return (
    <Box className="w-full gap-4 max-w-md mx-auto self-center">
      <FormControl isInvalid={!!errors.email}>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input size={height > 800 ? "xl" : "lg"}>
              <InputField
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

      <Link href="/forgot-password/otp-verification" asChild>
        <Button
          onPress={handleSubmit(handleForgotPassowrd)}
          size={height > 800 ? "xl" : "lg"}
        >
          <ButtonText>Send Code</ButtonText>
        </Button>
      </Link>
    </Box>
  );
};

export default ForgotPasswordForm;
