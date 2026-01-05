// Utils
import Axios from "axios";
import { queryClient } from "./client";

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error("Missing VITE_API_URL environment variable");
}

export const axios = Axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
});

// Handle 401 responses by clearing auth state
// Don't redirect here - let TanStack Router's beforeLoad handlers redirect
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear cached user data so auth checks will fail properly
      queryClient.setQueryData(["user"], null);
    }
    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  }
);
