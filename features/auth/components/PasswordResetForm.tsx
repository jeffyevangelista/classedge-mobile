// SetupPasswordScreen.tsx
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { Box } from "@/components/ui/box";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import useStore from "@/lib/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import { AnimatePresence, MotiView } from "moti";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useWindowDimensions } from "react-native";
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "react-native-heroicons/outline";
import zxcvbn from "zxcvbn";
import { useResetPassword } from "../auth.hooks";
import {
  ConfirmPasswordFormValues,
  confirmPasswordSchema,
} from "../auth.schemas";

const PasswordResetForm = () => {
  const { height } = useWindowDimensions();
  const isLarge = height > 800;
  const { email } = useStore.getState();
  const router = useRouter();
  const {
    mutateAsync: resetPassword,
    isPending,
    isError,
    error,
  } = useResetPassword();
  const { control, handleSubmit, watch, formState } =
    useForm<ConfirmPasswordFormValues>({
      resolver: zodResolver(confirmPasswordSchema),
    });

  const password = watch("password");
  const [show, setShow] = React.useState(false);
  const strength = zxcvbn(password || "");

  const scoreColors = ["#f87171", "#fb923c", "#facc15", "#4ade80", "#22c55e"];
  const scoreLabels = ["Very weak", "Weak", "Fair", "Good", "Strong"];

  const onSubmit = async (data: ConfirmPasswordFormValues) => {
    await resetPassword({ email: email!, password: data.password });
    router.replace("/(auth)/forgot-password/reset-success");
  };

  return (
    <Box className="w-full max-w-md max-auto self-center gap-4">
      {isError && (
        <Alert action="error">
          <AlertIcon as={ExclamationCircleIcon} />
          <AlertText>{error.message}</AlertText>
        </Alert>
      )}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Input size={isLarge ? "xl" : "lg"}>
              <InputField
                placeholder="New password"
                value={value}
                onChangeText={onChange}
                secureTextEntry={!show}
              />
              <InputSlot className="pr-3" onPress={() => setShow((s) => !s)}>
                <InputIcon as={show ? EyeIcon : EyeSlashIcon} />
              </InputSlot>
            </Input>
            {error && (
              <Text className="text-red-500 mt-1">{error.message}</Text>
            )}

            {/* Animated Strength bar */}
            <AnimatePresence>
              {value?.length > 0 && (
                <MotiView
                  from={{ opacity: 0, translateY: -4 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: -4 }}
                  className="mt-3"
                >
                  <Box className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <MotiView
                      from={{ width: "0%" }}
                      animate={{
                        width: `${((strength.score + 1) / 5) * 100}%`,
                        backgroundColor: scoreColors[strength.score],
                      }}
                      transition={{
                        type: "timing",
                        duration: 400,
                      }}
                      className="h-2 rounded-full"
                    />
                  </Box>
                  <Text
                    className="mt-1 text-sm font-medium"
                    style={{ color: scoreColors[strength.score] }}
                  >
                    {scoreLabels[strength.score]}
                  </Text>
                </MotiView>
              )}
            </AnimatePresence>
          </>
        )}
      />

      {/* Confirm password */}
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Input size={isLarge ? "xl" : "lg"}>
              <InputField
                placeholder="Confirm password"
                value={value}
                onChangeText={onChange}
                secureTextEntry={!show}
              />
            </Input>
            {error && (
              <Text className="text-red-500 mt-1">{error.message}</Text>
            )}
          </>
        )}
      />
      <Link href="/forgot-password/reset-success" asChild>
        <Button
          size={isLarge ? "xl" : "lg"}
          isDisabled={!formState.isValid || isPending}
          onPress={handleSubmit(onSubmit)}
        >
          {isPending ? (
            <ButtonSpinner />
          ) : (
            <ButtonText className="text-white text-center font-semibold text-base">
              Continue
            </ButtonText>
          )}
        </Button>
      </Link>
    </Box>
  );
};

export default PasswordResetForm;
