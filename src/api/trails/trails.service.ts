// Utils
import { AxiosResponse } from "axios";
import { axios } from "../axios";

// Interfaces
import { Trail, TrailMapBbox, TrailMapFilters } from "./trails";
import { TrailMapSort } from "./trails.enums";

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
  axios.get<Trail[]>("/user/trails").then((res) => res.data);

export const getTrails = async (
  bbox: TrailMapBbox,
  filters?: TrailMapFilters,
  sort?: TrailMapSort | null
): Promise<Trail[]> => {
  const params: Record<string, string> = {};

  params.lat_min = String(bbox.lat_min);
  params.lng_min = String(bbox.lng_min);
  params.lat_max = String(bbox.lat_max);
  params.lng_max = String(bbox.lng_max);

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        // Add Spatie filter parameter (filter[key])
        params[`filter[${key}]`] = value;
      }
    });
  }

  if (sort) {
    params.sort = sort;
  }

  return axios.get<{ data: Trail[] }>("/trails", { params }).then((res) => res.data.data);
};

export const getTrail = async (id: number): Promise<Trail> =>
  axios.get<Trail>(`/trails/${String(id)}`).then((res: AxiosResponse<Trail>) => res.data);

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
  axios.delete(`/trails/${String(id)}`).then(() => {});
