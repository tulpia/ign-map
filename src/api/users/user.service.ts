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
    .get<UserData>("/user")
    .then((response: AxiosResponse<UserData>) => response.data)
    .catch(() => null);
};

export const login = async (data: UserCredentials): Promise<UserData> => {
  return axios
    .post("/login", data)
    .then((response: AxiosResponse<UserData>) => response.data);
};

export const register = async (
  data: UserCredentials
): Promise<UserCredentials> => {
  return axios
    .post("/register", data)
    .then((response: AxiosResponse<UserCredentials>) => response.data);
};

export const logout = async (): Promise<void> => {
  return axios.post("/logout");
};
