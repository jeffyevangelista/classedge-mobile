import api from "@/lib/axios";
import { AuthResponse, LoginCredentials } from "./auth.types";

export const login = async ({
  username,
  password,
}: LoginCredentials): Promise<AuthResponse> => {
  return (await api.post("/auth/login/", { username, password })).data;
};

export const msLogin = async (token: string | null): Promise<AuthResponse> => {
  return (
    await api.get(`/auth/microsoft/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};

export const setupPassword = async (password: string) => {
  return (await api.patch("/auth/setup-password/", { password })).data;
};
