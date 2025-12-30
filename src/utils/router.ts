// Utils
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";

// Context
import { queryClient } from "../api/client";

interface MyRouterContext {
  queryClient: QueryClient;
  // any other context values you want to share
}

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    queryClient,
  } as MyRouterContext,
});

export default router;
