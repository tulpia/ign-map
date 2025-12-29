// Utils
import { RouterProvider } from "@tanstack/react-router";
import router from "../../utils/router";

// Hooks
import { useAuth } from "../../hooks/useAuth";

export function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}
