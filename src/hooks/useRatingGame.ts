import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  RatingGameInput,
  RatingGameResponse,
  ratingGame,
} from "@/services/games/rating-game";

import { ApiError } from "@/types/api-error";
import { GamesWithFavAndRating } from "@/types";

export const useRatingGame = (): UseMutationResult<
  RatingGameResponse,
  ApiError,
  RatingGameInput
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ratingGame,
    onMutate: async ({ gameId, rating }) => {
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
                rating,
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
