import { UseMutationResult, useMutation } from "@tanstack/react-query";

import { CreateUserInput, createUser } from "@/services/users/create-user";
import { ApiError } from "@/types/api-error";

export const useCreateUser = (): UseMutationResult<
  void,
  ApiError,
  CreateUserInput
> =>
  useMutation({
    mutationFn: createUser,
  });
