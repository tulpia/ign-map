// Utils (external libraries)
import { RouterProvider } from "@tanstack/react-router";

// Router
import router from "../../utils/router";

export function InnerApp() {
  return <RouterProvider router={router} />;
}
