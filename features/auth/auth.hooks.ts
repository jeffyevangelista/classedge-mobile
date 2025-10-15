import useStore from "@/lib/store";
import { queryClient } from "@/providers/QueryProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { login, msLogin } from "./auth.apis";
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
      router.replace("/(protected)/(dashboard)");
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
      router.replace("/");
    },
  });
};

export const useMsLogin = (token: string | null) => {
  const router = useRouter();
  const { setAcessToken, setRefreshToken } = useStore.getState();
  return useQuery({
    queryKey: ["ms-login"],
    queryFn: async () => {
      const data = await msLogin(token);

      if (data) {
        await Promise.all([
          setAcessToken(data.access),
          setRefreshToken(data.refresh),
        ]);
      }

      router.replace("/(protected)/(dashboard)");

      return data;
    },

    enabled: !!token,
  });
};
