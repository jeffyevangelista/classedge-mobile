// SetupPasswordScreen.tsx
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { AnimatePresence, MotiView } from "moti";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useWindowDimensions } from "react-native";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";
import zxcvbn from "zxcvbn";
import {
  ConfirmPasswordFormValues,
  confirmPasswordSchema,
} from "../auth.schemas";

const PasswordResetForm = () => {
  const { height } = useWindowDimensions();
  const isLarge = height > 800;
  const { control, handleSubmit, watch, formState } =
    useForm<ConfirmPasswordFormValues>({
      resolver: zodResolver(confirmPasswordSchema),
    });

  const password = watch("password");
  const [show, setShow] = React.useState(false);
  const strength = zxcvbn(password || "");

  const scoreColors = ["#f87171", "#fb923c", "#facc15", "#4ade80", "#22c55e"];
  const scoreLabels = ["Very weak", "Weak", "Fair", "Good", "Strong"];

  const onSubmit = (data: ConfirmPasswordFormValues) => {
    console.log("✅ Password created:", data.password);
  };

  return (
    <Box className="w-full max-w-md max-auto self-center gap-4">
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
          isDisabled={!formState.isValid}
          onPress={handleSubmit(onSubmit)}
        >
          <ButtonText className="text-white text-center font-semibold text-base">
            Continue
          </ButtonText>
        </Button>
      </Link>
    </Box>
  );
};

export default PasswordResetForm;
