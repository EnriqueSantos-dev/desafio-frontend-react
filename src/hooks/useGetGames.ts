import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { getAllGames } from "@/services/games/get-all-games";

import { GamesWithFavAndRating, GameUserDetails } from "@/types";
import { ApiError } from "@/types/api-error";

export const useGetGames = (
  favGamesAndRatings: GameUserDetails[]
): UseQueryResult<GamesWithFavAndRating, ApiError> => {
  return useQuery({
    queryKey: ["games"] as const,
    queryFn: async () => {
      const games = await getAllGames();

      return games.map((game) => {
        const gameFound = favGamesAndRatings.find(
          (favGameAndRating) => favGameAndRating.gameId === game.id
        );

        if (gameFound) {
          return {
            ...game,
            gameUserDetails: {
              isFavorite: gameFound.isFavorite,
              rating: gameFound.rating,
            },
          };
        }

        return {
          ...game,
          gameUserDetails: {
            isFavorite: false,
            rating: 0,
          },
        };
      });
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
