// Utils
import { useContext } from "react";

// Context
import { AuthContext } from "../providers/auth/AuthContext";

export function useAuth() {
  return useContext(AuthContext);
}
