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
  deleteTrail,
  getTrail,
  getTrails,
  getUserTrails,
} from "./trails.service";

// Interfaces
import { Trail } from "./trails";

// GET
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
