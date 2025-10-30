// Utils
import { ReactNode, useMemo } from "react";

// Providers
import { AuthContext } from "./AuthContext";

// Apis
import { useUserGet } from "../../api/users/user.api";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isLoading } = useUserGet();
  const isAuthenticated = !!data;

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      isUserLoading: isLoading,
      user: data,
    }),
    [isAuthenticated, isLoading, data]
  );

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
