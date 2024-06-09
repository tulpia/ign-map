import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "leaflet/dist/leaflet.css";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const theme = createTheme({
  /** Put your mantine theme override here */
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
