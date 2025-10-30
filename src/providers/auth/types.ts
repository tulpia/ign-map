// Types
import { UserData } from "../../api/users/user";

export interface AuthContextInterface {
  isAuthenticated: boolean;
  user: UserData | null | undefined;
}
