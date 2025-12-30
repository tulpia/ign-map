// Utils
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createTheme, MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import router from "./utils/router";

// Assets
import "leaflet/dist/leaflet.css";
import "@mantine/core/styles.css";

// Context
import { App } from "./providers/app/App";

// Queries
import { queryClient } from "./api/client";

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const theme = createTheme({
  /** Put your mantine theme override here */
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <MantineProvider theme={theme}>
          <App />
        </MantineProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </Suspense>
    </QueryClientProvider>
  </React.StrictMode>
);
