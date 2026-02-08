// Utils
import { AxiosResponse } from "axios";
import { axios } from "../axios";

// Interfaces
import { UserCredentials, UserData, UserDataUpdate } from "./user";

export const getCSRFToken = async () => axios.get("/sanctum/csrf-cookie");

export const getUser = async (): Promise<UserData | null> =>
  axios
    .get<UserData>("/user")
    .then((response: AxiosResponse<UserData>) => response.data)
    .catch(() => null);

export const login = async (data: UserCredentials): Promise<UserData> =>
  axios.post("/login", data).then((response: AxiosResponse<UserData>) => response.data);

export const register = async (data: UserCredentials): Promise<UserData> =>
  axios.post("/register", data).then((response: AxiosResponse<UserData>) => response.data);

export const update = async (data: UserDataUpdate): Promise<UserData> =>
  axios.put("/user/update", data).then((response: AxiosResponse<UserData>) => response.data);

export const logout = async (): Promise<void> => axios.post("/logout");
