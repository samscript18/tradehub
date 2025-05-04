import { toast } from "sonner";

type ErrorResponse = {
  response?: {
    data?: {
      message?: string;
      error?: string;
    };
  };
  message?: string;
};

export function errorHandler<T extends ErrorResponse | string>(error: T) {
  const formattedError = typeof error === 'string' ? error : error?.response?.data?.message || error?.response?.data?.error || error?.message;
  toast.error(formattedError, {
    duration: 3000,
  });
  return error as T;
}