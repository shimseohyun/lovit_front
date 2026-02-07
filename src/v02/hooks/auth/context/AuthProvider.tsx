import { createContext, useEffect, useMemo, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firestoreAuth } from "@apisV02/firebase/core";
import type { AuthContextValue, AuthUser } from "@interfacesV02/data/auth";

export const AuthContext = createContext<AuthContextValue | null>(null);

const AUTH_TIMEOUT_MS = 3000;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);

  const is_finalized_ref = useRef(false);

  useEffect(() => {
    const timeout_id = window.setTimeout(() => {
      if (is_finalized_ref.current) return;
      is_finalized_ref.current = true;

      setUser(null);
      setIsLoading(false);
    }, AUTH_TIMEOUT_MS);

    // 2) auth 구독
    const unsub = onAuthStateChanged(firestoreAuth, (firebaseUser) => {
      if (is_finalized_ref.current) return;
      is_finalized_ref.current = true;

      window.clearTimeout(timeout_id);

      if (!firebaseUser) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      const next_user: AuthUser = {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName ?? firebaseUser.email ?? null,
      };

      setUser(next_user);
      setIsLoading(false);
    });

    return () => {
      window.clearTimeout(timeout_id);
      unsub();
    };
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    const isLoggedIn = user !== null;

    return {
      isLoading,
      isLoggedIn,
      user,
    };
  }, [isLoading, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
