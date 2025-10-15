export type LoginCredentials = {
  username: string;
  password: string;
};

export type AuthUser = {
  id: number;
  role: string[];
  needsPasswordSetup: boolean;
  needsOnboarding: boolean;
};

export type AuthResponse = {
  refresh: string;
  access: string;
  access_expiry: number;
  refresh_expiry: number;
};

export type DecodedToken = {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  role: string[];
  needs_password_setup: false;
  needs_onboarding: false;
};
