import type { AuthContextValue } from "@interfacesV02/data/auth";
import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider />");
  return ctx;
};
