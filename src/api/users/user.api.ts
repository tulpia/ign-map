// Utils
import { QueryClient, UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query";

// Requests
import { getCSRFToken, getUser, login, logout, register, update } from "./user.service";

// Interfaces
import { UserCredentials, UserData, UserDataUpdate } from "./user";

export const userQuery = () => ({
  queryKey: ["user"] as const,
  queryFn: getUser,
  retry: false,
});

export const useUserLogin = (): UseMutationResult<UserData, Error, UserCredentials> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UserCredentials) => {
      await getCSRFToken();

      return login(data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export const useUserRegister = (): UseMutationResult<UserCredentials, Error, UserCredentials> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UserCredentials) => {
      await getCSRFToken();

      return register(data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export const useUserUpdate = (): UseMutationResult<UserDataUpdate, Error, UserDataUpdate> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UserDataUpdate) => update(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export const useUserLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["user"],
      });

      window.location.reload();
    },
  });
};
