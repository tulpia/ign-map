// Interfaces / Types
import { UserData } from "../../api/users/user";

export interface AuthContextInterface {
  isAuthenticated: boolean;
  isUserLoading: boolean;
  user: UserData | null | undefined;
}
