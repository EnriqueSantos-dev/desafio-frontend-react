import { UseMutationResult, useMutation } from "@tanstack/react-query";

import { LoginUserInput, loginUser } from "@/services/users/login";
import { ApiError } from "@/types/api-error";

export const useLogin = (): UseMutationResult<void, ApiError, LoginUserInput> =>
  useMutation({
    mutationFn: loginUser,
  });
