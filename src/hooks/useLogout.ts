import { UseMutationResult, useMutation } from "@tanstack/react-query";

import { logoutUser } from "@/services/users/logout";
import { ApiError } from "@/types/api-error";

export const useLogout = (): UseMutationResult<void, ApiError> =>
  useMutation({
    mutationFn: logoutUser,
  });
