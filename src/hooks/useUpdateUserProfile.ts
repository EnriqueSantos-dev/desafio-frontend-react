import { UseMutationResult, useMutation } from "@tanstack/react-query";

import {
  UpdateUserProfileInput,
  UpdateUserProfileResponse,
  updateUserProfile,
} from "@/services/users/update-profile";

import { ApiError } from "@/types/api-error";

export const useUpdateUserProfile = (): UseMutationResult<
  UpdateUserProfileResponse,
  ApiError,
  UpdateUserProfileInput
> =>
  useMutation({
    mutationFn: updateUserProfile,
  });
