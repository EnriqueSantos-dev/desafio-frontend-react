import { getErrorMessage, serverErrorStatus } from "@/constants/error-messages";
import axios, { AxiosError, isAxiosError } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "dev-email-address": process.env.NEXT_PUBLIC_USER_EMAIL,
  },
});

// setup for intercept axios responses
api.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (!isAxiosError(error)) {
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

    if (error.code === AxiosError.ETIMEDOUT) {
      error.message = getErrorMessage("timeout_error");
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
