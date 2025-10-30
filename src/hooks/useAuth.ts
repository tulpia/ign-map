// Utils
import { useContext } from "react";

// Context
import { AuthContext } from "../providers/auth/AuthContext";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
