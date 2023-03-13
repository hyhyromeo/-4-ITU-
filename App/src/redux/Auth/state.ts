import { JWTPayload } from "../../../../Shared/dist/types";

export type AuthState = {
  token: string | null;
  user: AuthUser | null;
  error: string | null;
  draftProfileFile:File|null
};

export type AuthUser = JWTPayload;

export const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: null,
  error: null,
  draftProfileFile:null
};

export type RegisterState = {
  email: string | null;
  password: string | null;
  cpassword: string | null;
};

export type LoginState = {
  email: string | null;
  password: string | null;
};
