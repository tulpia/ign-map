// Utils
import {
  QueryClient,
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";

// Requests
import {
  createTrail,
  deleteTrail,
  getTrail,
  getTrails,
  getUserTrails,
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
      // eslint-disable-next-line no-void
      void queryClient.invalidateQueries({
        queryKey: ["trails"],
      });
    },
  });
};

// READ
export const useUserGetTrails = (): UseQueryResult<Trail[] | null> => {
  return useQuery({
    queryKey: ["user.trails"],
    queryFn: getUserTrails,
    retry: false,
  });
};

export const useTrailsGet = (): UseQueryResult<Trail[] | null> => {
  return useQuery({
    queryKey: ["trails"],
    queryFn: getTrails,
    retry: false,
  });
};

export const useTrailGet = (id: number): UseQueryResult<Trail | null> => {
  return useQuery({
    queryKey: ["trails", id],
    queryFn: () => getTrail(id),
    retry: false,
  });
};

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
