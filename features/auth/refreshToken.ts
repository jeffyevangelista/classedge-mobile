import { API_URL } from "@/utils/env";
import axios from "axios";
import { AuthResponse } from "./auth.types";

// Separated refresh endpoint from authApi.ts because of the warning below:
// Require cycle: api/authApi.ts -> api/index.ts -> api/authApi.ts
// Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.
export const refresh = async (
  token: string | null
): Promise<{ access: AuthResponse["access"] }> => {
  return (
    await axios.post(`${API_URL}/auth/refresh/`, {
      refresh: token,
    })
  ).data;
};
