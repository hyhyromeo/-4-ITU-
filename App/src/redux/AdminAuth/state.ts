export type AdminAuthState = {
  email: string | null;
  password: string | null;
  cpassword: string | null;
  admin: boolean | null;
  error: string | null;
};

export const initialState: AdminAuthState = {
  email: null,
  password: null,
  cpassword: null,
  admin: null,
  error: null,
};

