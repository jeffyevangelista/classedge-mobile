import { refresh } from "@/features/auth/refreshToken";
import useStore from "@/lib/store";
import { useEffect, useRef } from "react";

export default function useTokenRefresher() {
  const {
    accessToken,
    refreshToken,
    expiresAt,
    setAccessToken,
    clearCredentials,
  } = useStore();
  const refreshTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // clear old timer
    if (refreshTimer.current) {
      clearTimeout(refreshTimer.current);
      refreshTimer.current = null;
    }

    // only if logged in
    if (!accessToken || !refreshToken || !expiresAt) return;

    const now = Date.now();
    const timeLeft = expiresAt - now;

    // refresh 1 minute before expiry
    const refreshThreshold = 60 * 1000;
    const refreshIn = timeLeft - refreshThreshold;

    if (refreshIn <= 0) {
      // token already near/expired -> refresh now
      (async () => {
        try {
          const { access } = await refresh(refreshToken);
          await setAccessToken(access);
        } catch (error) {
          console.warn("Proactive refresh failed:", error);
          await clearCredentials();
        }
      })();
    } else {
      // schedule refresh before expiry
      refreshTimer.current = setTimeout(async () => {
        try {
          const { access } = await refresh(refreshToken);
          await setAccessToken(access);
        } catch (error) {
          console.warn("Proactive refresh failed:", error);
          await clearCredentials();
        }
      }, refreshIn);
    }

    // cleanup
    return () => {
      if (refreshTimer.current) clearTimeout(refreshTimer.current);
    };
  }, [accessToken, refreshToken, expiresAt, setAccessToken, clearCredentials]);
}
