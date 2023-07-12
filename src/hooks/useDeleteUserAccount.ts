import { UseMutationResult, useMutation } from "@tanstack/react-query";

import { deleteUserAccount } from "@/services/users/delete-account";
import { ApiError } from "@/types/api-error";

export const useDeleteUserAccount = (): UseMutationResult<void, ApiError> =>
  useMutation({
    mutationFn: deleteUserAccount,
  });
