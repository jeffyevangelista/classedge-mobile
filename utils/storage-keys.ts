export const ASYNC_STORAGE_KEYS = {
  AUTH_USER: "authUser",
} as const;

export type AsyncStorageKey =
  (typeof ASYNC_STORAGE_KEYS)[keyof typeof ASYNC_STORAGE_KEYS];
