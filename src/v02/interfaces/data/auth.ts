export type AuthUser = {
  uid: string;
  name: string | null;
};

export type AuthContextValue = {
  isLoading: boolean;

  isLoggedIn: boolean;
  user: AuthUser | null;
};
