// Utils
import {
  QueryClient,
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { getCSRFToken, getUser, login, logout, register } from "./user.service";

// Interfaces
import { UserCredentials, UserData } from "./user.d";

export const useUserGet = (): UseQueryResult<UserData | null> => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
  });
};

export const useUserLogin = (): UseMutationResult<
  AxiosResponse<any, any>,
  Error,
  UserCredentials,
  unknown
> => {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserCredentials) =>
      getCSRFToken().then(() => login(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export const useUserRegister = (): UseMutationResult<
  AxiosResponse<any, any>,
  Error,
  UserCredentials,
  unknown
> => {
  return useMutation({
    mutationFn: (data: UserCredentials) =>
      getCSRFToken().then(() => register(data)),
  });
};

export const useUserLogout = () => {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });

      window.location.reload();
    },
  });
};
