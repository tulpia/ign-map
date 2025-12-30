// Utils
import {
  QueryClient,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

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
import { Trail } from "./trails";

// CREATE
export const useTrailCreate = (): UseMutationResult<
  Trail | null,
  Error,
  FormData
> => {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => createTrail(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trails"] });
    },
  });
};

export const useTrailUpdate = (): UseMutationResult<
  Trail | null,
  Error,
  { id: number; data: FormData }
> => {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) =>
      updateTrail(id, data),
    onSuccess: (_data, variables) => {
      // invalidate relevant queries
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

export const trailsQuery = () => ({
  queryKey: ["trails"] as const,
  queryFn: getTrails,
  retry: false,
});

export const trailQuery = (id: string | number) => ({
  queryKey: ["trails", String(id)] as const,
  queryFn: () => getTrail(Number(id)),
  retry: false,
});

// DELETE
export const useTrailDelete = (): UseMutationResult<null, Error, number> => {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTrail(id),
    onSuccess: () => {
      // eslint-disable-next-line no-void
      void queryClient.invalidateQueries({
        queryKey: ["trails"],
      });
    },
  });
};
