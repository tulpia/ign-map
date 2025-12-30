import { QueryClient, skipToken } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";
import { getUser } from "../api/users/user.service";

/**
 * Ensure user is authenticated. Returns null if valid, redirects to "/" if not.
 * Use in route `beforeLoad` handlers.
 */
export const ensureAuth = async (queryClient: QueryClient) => {
  const user =
    queryClient.getQueryData(["user"]) ??
    (await queryClient.fetchQuery({ queryKey: ["user"], queryFn: getUser }).catch(() => null));

  if (!user) {
    return redirect({ to: "/" });
  }

  return null;
};
