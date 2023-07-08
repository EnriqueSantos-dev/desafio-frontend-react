import { getErrorMessage, serverErrorStatus } from "@/constants/error-messages";
import axios, { AxiosError, isAxiosError } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "dev-email-address": process.env.NEXT_PUBLIC_USER_EMAIL,
  },
});

export const apiInternal = axios.create();

// Função para reutilizar o interceptor
const responseInterceptor = (error: any) => {
  if (!isAxiosError(error)) {
    return Promise.reject(error);
  }

  if (error.code === AxiosError.ECONNABORTED) {
    error.message = getErrorMessage("timeout_error");
    return Promise.reject(error);
  }

  const hasStatusCode = error.response?.status;

  if (!hasStatusCode) {
    error.message = getErrorMessage("generic_error");
    return Promise.reject(error);
  }

  const isServerError = serverErrorStatus.includes(error.response?.status!);

  if (isServerError) {
    error.message = getErrorMessage("internal_error");
    return Promise.reject(error);
  }

  error.message = getErrorMessage("generic_error");
  return Promise.reject(error);
};

api.interceptors.response.use((res) => res, responseInterceptor);
apiInternal.interceptors.response.use((res) => res, responseInterceptor);
