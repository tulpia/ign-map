// Utils
import { axios } from "../axios";

// Interfaces
import { UserCredentials } from "./user.d";

export const getCSRFToken = async () => {
  return axios.get("/sanctum/csrf-cookie");
};

export const login = async (data: UserCredentials) => {
  return axios.post("/login", data);
};

export const register = async (data: UserCredentials) => {
  return axios.post("/register", data);
};
