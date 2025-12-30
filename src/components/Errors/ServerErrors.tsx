import axios, { AxiosError } from "axios";
import { Stack, Text } from "@mantine/core";

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

  const axiosError = error as AxiosError<{ errors: Record<string, string> }>;
  const errors = axiosError.response?.data?.errors;

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
