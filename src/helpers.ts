import { isAxiosError } from "axios";

export const getErrorMessage = (
  error: unknown,
  message = "Unknown error",
): string => {
  if (isAxiosError(error)) {
    return error.response?.data?.message ?? error.message ?? message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return message;
};
