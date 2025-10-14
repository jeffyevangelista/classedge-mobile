export type LoginCredentials = {
  username: string;
  password: string;
};

export type AuthUser = {
  id: number;
  roles: string[];
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
  roles: string[];
};
