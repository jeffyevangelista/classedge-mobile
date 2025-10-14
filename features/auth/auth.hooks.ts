import useStore from "@/lib/store";
import { queryClient } from "@/providers/QueryProvider";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { login } from "./auth.apis";
import { AuthResponse, LoginCredentials } from "./auth.types";
import { refresh } from "./refreshToken";

export const useLogin = () => {
  const router = useRouter();
  const { setAcessToken, setRefreshToken } = useStore.getState();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (payload: LoginCredentials) => login(payload),
    onSuccess: async (data: AuthResponse) => {
      await Promise.all([
        setAcessToken(data.access),
        setRefreshToken(data.refresh),
      ]);
      router.replace("/(root)/(protected)");
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
      router.replace("/(root)");
    },
  });
};
