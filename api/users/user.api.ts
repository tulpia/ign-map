// Utils
import { useMutation } from "@tanstack/react-query";
import { getCSRFToken, login, register } from "./user.service";

// Interfaces
import { UserCredentials } from "./user.d";

export const useUserLogin = () => {
  const mutation = useMutation({
    mutationFn: (data: UserCredentials) =>
      getCSRFToken().then(() => login(data)),
  });

  return mutation;
};

export const useUserRegister = () => {
  const mutation = useMutation({
    mutationFn: (data: UserCredentials) =>
      getCSRFToken().then(() => register(data)),
  });

  return mutation;
};
