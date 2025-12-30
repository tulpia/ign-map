// Utils (external libraries)
import { ReactNode, useMemo } from "react";
import { Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

// Providers
import { AuthContext } from "./AuthContext";

// Api / query options
import { userQuery } from "../../api/users/user.api";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isLoading } = useQuery(userQuery());
  const isAuthenticated = !!data;

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      isUserLoading: isLoading,
      user: data,
    }),
    [isAuthenticated, isLoading, data]
  );

  return isLoading ? (
    <Loader />
  ) : (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
