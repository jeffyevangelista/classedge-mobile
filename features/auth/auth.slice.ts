import {
  deleteASData,
  getASData,
  storeASData,
} from "@/lib/storage/async-storage";
import {
  deleteSSData,
  getSSData,
  storeSSData,
} from "@/lib/storage/secure-storage";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/utils/env";
import { ASYNC_STORAGE_KEYS } from "@/utils/storage-keys";
import { jwtDecode } from "jwt-decode";
import { StateCreator } from "zustand";
import { AuthUser, DecodedToken } from "./auth.types";

type AuthState = {
  accessToken: string | null;
  isAuthenticated: boolean;
  refreshToken: string | null;
  authUser: AuthUser | null;
};

type AuthAction = {
  setAcessToken: (token: string) => Promise<void>;
  setRefreshToken: (token: string) => Promise<void>;
  restoreSession: () => Promise<void>;
  clearCredentials: () => Promise<void>;
};

export type AuthSlice = AuthState & AuthAction;

const initialState: AuthState = {
  accessToken: null,
  isAuthenticated: false,
  refreshToken: null,
  authUser: null,
};

const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  ...initialState,
  setAcessToken: async (token) => {
    const { user_id, role } = jwtDecode<DecodedToken>(token);

    await Promise.all([
      storeSSData(ACCESS_TOKEN_KEY, token),
      storeASData(
        ASYNC_STORAGE_KEYS.AUTH_USER,
        JSON.stringify({ id: user_id, role })
      ),
    ]);

    set({
      accessToken: token,
      authUser: { id: user_id, role },
      isAuthenticated: true,
    });
  },
  setRefreshToken: async (token) => {
    await storeSSData(REFRESH_TOKEN_KEY, token);
    set({ refreshToken: token, isAuthenticated: true });
  },
  restoreSession: async () => {
    const [accessToken, refreshToken, authUser] = await Promise.all([
      getSSData(ACCESS_TOKEN_KEY),
      getSSData(REFRESH_TOKEN_KEY),
      getASData<AuthUser | null>(ASYNC_STORAGE_KEYS.AUTH_USER),
    ]);

    const isAuthenticated = !!(accessToken && refreshToken);

    set({
      accessToken,
      refreshToken,
      authUser,
      isAuthenticated,
    });
  },
  clearCredentials: async () => {
    await Promise.all([
      deleteSSData(ACCESS_TOKEN_KEY),
      deleteSSData(REFRESH_TOKEN_KEY),
      deleteASData(ASYNC_STORAGE_KEYS.AUTH_USER),
    ]);
    set(() => ({ ...initialState }));
  },
});

export default createAuthSlice;
