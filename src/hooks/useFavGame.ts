import { UseMutationResult, useMutation } from "@tanstack/react-query";

import { ApiError } from "@/types/api-error";

import {
  FavGameInput,
  FavGameResponse,
  favGame,
} from "@/services/games/fav-game";

export const useFavoriteGame = (): UseMutationResult<
  FavGameResponse,
  ApiError,
  FavGameInput
> =>
  useMutation({
    mutationFn: favGame,
  });
