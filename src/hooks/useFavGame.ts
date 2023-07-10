import {
  QueryClient,
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { ApiError } from "@/types/api-error";

import {
  FavGameInput,
  FavGameResponse,
  favGame,
} from "@/services/games/fav-game";
import { GamesWithFavAndRating } from "@/types";

export const useFavoriteGame = (): UseMutationResult<
  FavGameResponse,
  ApiError,
  FavGameInput
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: favGame,
    onMutate: async ({ gameId, isFav }) => {
      await queryClient.cancelQueries({ queryKey: ["games"] });
      const snapshot = queryClient.getQueryData<GamesWithFavAndRating>([
        "games",
      ]);

      queryClient.setQueryData<GamesWithFavAndRating>(["games"], (old) => {
        return old?.map((game) => {
          if (game.id === gameId) {
            return {
              ...game,
              gameUserDetails: {
                ...game.gameUserDetails,
                isFavorite: isFav,
              },
            };
          }

          return game;
        });
      });

      return { snapshot };
    },

    onError: (_err, _variables, context) => {
      if (context?.snapshot) {
        queryClient.setQueryData<GamesWithFavAndRating>(
          ["games"],
          context.snapshot
        );
      }
    },
  });
};
