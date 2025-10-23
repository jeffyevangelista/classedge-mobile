import useStore from "@/lib/store";
import { queryClient } from "@/providers/QueryProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import {
  forgotPassword,
  login,
  msLogin,
  resetPassword,
  setupPassword,
  verifyOtp,
} from "./auth.apis";
import { AuthResponse, LoginCredentials } from "./auth.types";
import { refresh } from "./refreshToken";

export const useLogin = () => {
  const router = useRouter();
  const { setAccessToken, setRefreshToken } = useStore.getState();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (payload: LoginCredentials) => login(payload),
    onSuccess: async (data: AuthResponse) => {
      await Promise.all([
        setAccessToken(data.access),
        setRefreshToken(data.refresh),
      ]);
      router.replace("/(main)/(tabs)");
    },
  });
};

export const useRefresh = () => {
  return useMutation({
    mutationKey: ["refresh"],
    mutationFn: (token: string | null) => refresh(token),
  });
};

export const useLogout = () => {
  const router = useRouter();
  const { clearCredentials } = useStore.getState();
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => clearCredentials(),
    onSuccess: () => {
      queryClient.clear();
      router.replace("/(auth)/login");
    },
  });
};

export const useMsLogin = (token: string | null) => {
  const router = useRouter();
  const { setAccessToken, setRefreshToken } = useStore.getState();
  return useQuery({
    queryKey: ["ms-login"],
    queryFn: async () => {
      const data = await msLogin(token);

      if (data) {
        await Promise.all([
          setAccessToken(data.access),
          setRefreshToken(data.refresh),
        ]);
      }

      router.replace("/(main)/(tabs)");

      console.log(data);

      return data;
    },

    enabled: !!token,
  });
};

export const useSetupPassword = () => {
  const router = useRouter();
  const { setAccessToken, setRefreshToken } = useStore.getState();
  return useMutation({
    mutationKey: ["setup-password"],
    mutationFn: (password: string) => setupPassword(password),
    onSuccess: async (data: AuthResponse) => {
      await Promise.all([
        setAccessToken(data.access),
        setRefreshToken(data.refresh),
      ]);
      router.replace("/(main)/(tabs)");
    },
  });
};

export const useForgotPassword = () => {
  const { setEmail } = useStore.getState();
  return useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: ({ email }: { email: string }) => forgotPassword(email),
    onSuccess: (_, { email }: { email: string }) => {
      setEmail(email);
    },
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationKey: ["verify-otp"],
    mutationFn: ({ email, otp }: { email: string; otp: string }) =>
      verifyOtp(email, otp),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationKey: ["reset-password"],
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      resetPassword(email, password),
  });
};
