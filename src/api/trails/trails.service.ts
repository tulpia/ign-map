// Utils
import { AxiosResponse } from "axios";
import { axios } from "../axios";

// Interfaces
import { Trail } from "./trails";

// GET
export const getUserTrails = async (): Promise<Trail[] | null> => {
  return axios
    .get<Trail[]>("/user/trails", {
      headers: { Accept: "application/json" },
    })
    .then((res) => res.data)
    .catch(() => null);
};

export const getTrails = async (): Promise<Trail[] | null> => {
  return axios
    .get<Trail[]>("/trails", {
      headers: { Accept: "application/json" },
    })
    .then((res) => res.data)
    .catch(() => null);
};

export const getTrail = async (id: number): Promise<Trail | null> => {
  return axios
    .get<Trail>(`/trails/${String(id)}`, {
      headers: { Accept: "application/json" },
    })
    .then((res: AxiosResponse<Trail>) => res.data)
    .catch(() => null);
};

// DELETE
export const deleteTrail = async (id: number): Promise<null> => {
  return axios
    .delete<null>(`/trails/${String(id)}`, {
      headers: { Accept: "application/json" },
    })
    .then((res: AxiosResponse<null>) => res.data)
    .catch(() => null);
};
