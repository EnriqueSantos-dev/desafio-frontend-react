import { UseMutationResult, useMutation } from "@tanstack/react-query";

import {
  RatingGameInput,
  RatingGameResponse,
  ratingGame,
} from "@/services/games/rating-game";

import { ApiError } from "@/types/api-error";

export const useRatingGame = (): UseMutationResult<
  RatingGameResponse,
  ApiError,
  RatingGameInput
> =>
  useMutation({
    mutationFn: ratingGame,
  });
