// Utils
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";

// Requests
import {
  createTrail,
  deleteTrail,
  getTrail,
  getTrails,
  getUserTrails,
  updateTrail,
} from "./trails.service";

// Interfaces
import { Trail, TrailMapBbox, TrailMapFilters } from "./trails";

// Enums
import { TrailMapSort } from "./trails.enums";

// CREATE
export const useTrailCreate = (): UseMutationResult<Trail, Error, FormData> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => createTrail(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trails"] });
    },
  });
};

export const useTrailUpdate = (): UseMutationResult<
  Trail,
  Error,
  { id: number; data: FormData }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) => updateTrail(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["trails"] });
      queryClient.invalidateQueries({ queryKey: ["user.trails"] });
      queryClient.invalidateQueries({
        queryKey: ["trails", String(variables.id)],
      });
    },
  });
};

// READ
export const userTrailsQuery = () => ({
  queryKey: ["user.trails"] as const,
  queryFn: getUserTrails,
  retry: false,
});

export const trailsQuery = (
  bbox: TrailMapBbox,
  filters?: TrailMapFilters,
  sort?: TrailMapSort | null
) => ({
  queryKey: ["trails", bbox, filters, sort] as const,
  queryFn: () => getTrails(bbox, filters, sort),
  retry: false,
});

export const trailQuery = (id: string | number) => ({
  queryKey: ["trails", String(id)] as const,
  queryFn: () => getTrail(Number(id)),
  retry: false,
});

// DELETE
export const useTrailDelete = (): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTrail(id),
    onSuccess: () => {
      // Invalidate all trail-related queries
      queryClient.invalidateQueries({
        queryKey: ["trails"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user.trails"],
      });
    },
  });
};
