// Utils
import { AxiosResponse } from "axios";
import { axios } from "../axios";

// Interfaces
import { UserCredentials, UserData } from "./user";

export const getCSRFToken = async () => {
  return axios.get("/sanctum/csrf-cookie");
};

export const getUser = async (): Promise<UserData | null> => {
  return axios
    .get("/user")
    .then((response: AxiosResponse) => response.data)
    .catch(() => null);
};

export const login = async (data: UserCredentials): Promise<AxiosResponse> => {
  return axios
    .post("/login", data)
    .then((response: AxiosResponse) => response.data);
};

export const register = async (
  data: UserCredentials
): Promise<AxiosResponse> => {
  return axios
    .post("/register", data)
    .then((response: AxiosResponse) => response.data);
};

export const logout = async (): Promise<AxiosResponse> => {
  return axios.post("/logout").then((response: AxiosResponse) => response.data);
};
