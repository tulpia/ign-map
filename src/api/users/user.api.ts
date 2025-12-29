// Utils
import {
  QueryClient,
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

// Requests
import {
  getCSRFToken,
  getUser,
  login,
  logout,
  register,
  update,
} from "./user.service";

// Interfaces
import { UserCredentials, UserData, UserDataUpdate } from "./user";

export const useUserGet = (): UseQueryResult<UserData | null> => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
  });
};

export const useUserLogin = (): UseMutationResult<
  UserData,
  Error,
  UserCredentials
> => {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UserCredentials) => {
      await getCSRFToken();

      return login(data);
    },
    onSuccess: () => {
      // eslint-disable-next-line no-void
      void queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export const useUserRegister = (): UseMutationResult<
  UserCredentials,
  Error,
  UserCredentials
> => {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UserCredentials) => {
      await getCSRFToken();

      return register(data);
    },
    onSuccess: () => {
      // eslint-disable-next-line no-void
      void queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export const useUserUpdate = (): UseMutationResult<
  UserDataUpdate,
  Error,
  UserDataUpdate
> => {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UserDataUpdate) => {
      return update(data);
    },
    onSuccess: () => {
      // eslint-disable-next-line no-void
      void queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export const useUserLogout = () => {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      // eslint-disable-next-line no-void
      void queryClient.invalidateQueries({
        queryKey: ["user"],
      });

      window.location.reload();
    },
  });
};
