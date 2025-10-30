// Utils
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";

// Context
import { AuthContextInterface } from "../providers/auth/types";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    auth: {} as AuthContextInterface,
  },
});

export default router;
