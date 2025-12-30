// Utils
import { AxiosResponse } from "axios";
import { axios } from "../axios";

// Interfaces
import { Trail } from "./trails";

// CREATE
export const createTrail = async (data: FormData): Promise<Trail | null> =>
  axios
    .post<Trail>("/trails/", data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res: AxiosResponse<Trail>) => res.data)
    .catch(() => null);

// READ
export const getUserTrails = async (): Promise<Trail[] | null> =>
  axios
    .get<Trail[]>("/user/trails", {
      headers: { Accept: "application/json" },
    })
    .then((res) => res.data)
    .catch(() => null);

export const getTrails = async (): Promise<Trail[] | null> =>
  axios
    .get<Trail[]>("/trails", {
      headers: { Accept: "application/json" },
    })
    .then((res) => res.data)
    .catch(() => null);

export const getTrail = async (id: number): Promise<Trail | null> =>
  axios
    .get<Trail>(`/trails/${String(id)}`, {
      headers: { Accept: "application/json" },
    })
    .then((res: AxiosResponse<Trail>) => res.data)
    .catch(() => null);

// UPDATE
export const updateTrail = async (id: number, data: FormData): Promise<Trail | null> => {
  try {
    if (data instanceof FormData && !data.has("__method")) {
      data.append("__method", "PUT");
    }

    const res: AxiosResponse<Trail> = await axios.post<Trail>(`/trails/${String(id)}`, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        "X-HTTP-Method-Override": "PUT",
      },
    });

    return res.data;
  } catch {
    return null;
  }
};

// DELETE
export const deleteTrail = async (id: number): Promise<null> =>
  axios
    .delete<null>(`/trails/${String(id)}`, {
      headers: { Accept: "application/json" },
    })
    .then((res: AxiosResponse<null>) => res.data)
    .catch(() => null);
