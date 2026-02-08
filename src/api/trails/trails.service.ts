// Utils
import { AxiosResponse } from "axios";
import { axios } from "../axios";

// Interfaces
import { Trail } from "./trails";

// CREATE
export const createTrail = async (data: FormData): Promise<Trail> =>
  axios
    .post<Trail>("/trails/", data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res: AxiosResponse<Trail>) => res.data);

// READ
export const getUserTrails = async (): Promise<Trail[]> =>
  axios
    .get<Trail[]>("/user/trails")
    .then((res) => res.data);

export const getTrails = async (): Promise<Trail[]> =>
  axios
    .get<Trail[]>("/trails")
    .then((res) => res.data);

export const getTrail = async (id: number): Promise<Trail> =>
  axios
    .get<Trail>(`/trails/${String(id)}`)
    .then((res: AxiosResponse<Trail>) => res.data);

// UPDATE
export const updateTrail = async (id: number, data: FormData): Promise<Trail> => {
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
};

// DELETE
export const deleteTrail = async (id: number): Promise<void> =>
  axios
    .delete<void>(`/trails/${String(id)}`)
    .then(() => {});
