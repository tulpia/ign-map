// Utils
import { createContext } from "react";

// Types
import { AuthContextInterface } from "./types";

export const AuthContext = createContext<AuthContextInterface | null>(null);
