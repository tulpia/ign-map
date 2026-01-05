// Utils
import axios, { AxiosError } from "axios";
import { Alert, Stack, Text } from "@mantine/core";

export interface ServerErrorsProps {
  error?: Error | null;
  isError?: boolean;
}

/**
 * Display server validation errors from axios responses.
 * Expects error.response.data.errors to be a Record<string, string>.
 */
export function ServerErrors({ error, isError }: ServerErrorsProps) {
  if (!isError || !error || !axios.isAxiosError(error)) {
    return null;
  }

  // On est jamais censé arriver ici si on n'a pas la permission d'accéder à la ressource
  // Neanmoins, on gère le cas pour afficher un message plus clair
  if (error.status === 403) {
    return (
      <Alert variant="light" color="red" title="Accès refusé">
        Vous n&apos;avez pas l&apos;autorisation d&apos;accéder à cette ressource.
      </Alert>
    );
  }

  const axiosError = error as AxiosError<{ errors: Record<string, string> }>;
  const errors = axiosError.response?.data.errors;

  if (!errors || Object.keys(errors).length === 0) {
    return null;
  }

  return (
    <Stack gap="xs">
      {Object.entries(errors).map(([key, message]) => (
        <Text c="red.4" key={key} size="sm">
          {message}
        </Text>
      ))}
    </Stack>
  );
}

ServerErrors.defaultProps = {
  error: null,
  isError: false,
};
