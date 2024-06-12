// Utils
import { UserData } from "@/api/users/user";
import { useUserGet } from "@/api/users/user.api";
import { ReactNode } from "@tanstack/react-router";
import { createContext, useContext } from "react";

export interface AuthContext {
  isAuthenticated: boolean;
  user: UserData | null | undefined;
}

export const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data } = useUserGet();
  const isAuthenticated = !!data;
  console.log(data);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user: data }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
