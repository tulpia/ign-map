// Utils
import { ReactNode } from "react";

// Providers
import { AuthContext } from "./AuthContext";

// Apis
import { useUserGet } from "../../api/users/user.api";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data } = useUserGet();
  const isAuthenticated = !!data;

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ isAuthenticated, user: data }}>
      {children}
    </AuthContext.Provider>
  );
}
