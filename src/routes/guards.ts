import { QueryClient } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";

/**
 * Ensure user is authenticated. Returns null if valid, redirects to "/" if not.
 * Use in route `beforeLoad` handlers.
 *
 * The root loader pre-fetches the user and explicitly sets cache to null if fetch fails,
 * so this should use the cached value without refetching.
 */
export const ensureAuth = (queryClient: QueryClient) => {
  const cachedUser = queryClient.getQueryData(["user"]);

  // If cache is explicitly set (even to null), use it without refetching
  if (cachedUser !== undefined) {
    if (!cachedUser) {
      return redirect({ to: "/" });
    }
    return null;
  }

  // If cache was never set, this shouldn't happen because root loader runs first
  // But just in case, return null to allow the route to load
  // (AuthProvider will handle showing loading state)
  return null;
};
