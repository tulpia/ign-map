// Utils
import Axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error("Missing VITE_API_URL environment variable");
}

export const axios = Axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensure cookies are sent with requests
  withXSRFToken: true,
});

// Handle 401 responses by clearing auth state and redirecting
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear cached user data
      const { queryClient } = require("./client");
      queryClient.setQueryData(["user"], null);
      // Redirect to home/login
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
