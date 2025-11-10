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
  email: string | null;
  expiresAt: number | null;
};

type AuthAction = {
  setAccessToken: (token: string) => Promise<void>;
  setRefreshToken: (token: string) => Promise<void>;
  restoreSession: () => Promise<void>;
  clearCredentials: () => Promise<void>;
  setEmail: (email: string) => void;
};

export type AuthSlice = AuthState & AuthAction;

const initialState: AuthState = {
  accessToken: null,
  isAuthenticated: false,
  refreshToken: null,
  authUser: null,
  email: null,
  expiresAt: null,
};

const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  ...initialState,
  setAccessToken: async (token) => {
    const {
      user_id,
      role,
      needs_onboarding: needsOnboarding,
      needs_password_setup: needsPasswordSetup,
      exp,
    } = jwtDecode<DecodedToken>(token);
    const expiresAt = exp * 1000;

    await Promise.all([
      storeSSData(ACCESS_TOKEN_KEY, token),
      storeASData(ASYNC_STORAGE_KEYS.AUTH_USER, {
        id: user_id,
        role,
        needsOnboarding,
        needsPasswordSetup,
      }),
      storeASData(ASYNC_STORAGE_KEYS.EXPIRES_AT, expiresAt.toString()),
    ]);

    set({
      accessToken: token,
      authUser: { id: user_id, role, needsOnboarding, needsPasswordSetup },
      isAuthenticated: true,
      expiresAt,
    });
  },
  setRefreshToken: async (token) => {
    await storeSSData(REFRESH_TOKEN_KEY, token);
    set({ refreshToken: token, isAuthenticated: true });
  },
  restoreSession: async () => {
    const [accessToken, refreshToken, authUser, expiresAt] = await Promise.all([
      getSSData(ACCESS_TOKEN_KEY),
      getSSData(REFRESH_TOKEN_KEY),
      getASData<AuthUser | null>(ASYNC_STORAGE_KEYS.AUTH_USER),
      getASData<string | null>(ASYNC_STORAGE_KEYS.EXPIRES_AT),
    ]);

    const isAuthenticated = !!(
      accessToken &&
      refreshToken &&
      authUser &&
      expiresAt
    );

    set({
      accessToken,
      refreshToken,
      authUser,
      isAuthenticated,
      expiresAt: expiresAt ? Number(expiresAt) : null,
    });
  },
  clearCredentials: async () => {
    await Promise.all([
      deleteSSData(ACCESS_TOKEN_KEY),
      deleteSSData(REFRESH_TOKEN_KEY),
      deleteASData(ASYNC_STORAGE_KEYS.AUTH_USER),
      deleteASData(ASYNC_STORAGE_KEYS.EXPIRES_AT),
    ]);
    set(() => ({ ...initialState }));
  },
  setEmail: (email) => set({ email }),
});

export default createAuthSlice;
