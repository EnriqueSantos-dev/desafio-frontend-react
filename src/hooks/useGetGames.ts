import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { getAllGames } from "@/services/games/get-all-games";

import { GamesWithFavAndRating, GameUserDetails } from "@/types";
import { ApiError } from "@/types/api-error";

export const useGetGames = (
  favGames: GameUserDetails[]
): UseQueryResult<GamesWithFavAndRating, ApiError> => {
  const query = useQuery({
    queryKey: ["games"] as const,
    queryFn: getAllGames,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    // cache forever
  });

  return {
    ...query,
    data: query.data?.map((game) => {
      const gameFound = favGames.find(
        (ratingAndFavData) => ratingAndFavData.gameId === game.id
      );

      if (gameFound) {
        const defaultRating = game.gameUserDetails?.rating
          ? game.gameUserDetails.rating
          : gameFound.rating ?? 0;
        const defaultIsFavorite = game.gameUserDetails?.isFavorite
          ? game.gameUserDetails.isFavorite
          : gameFound.isFavorite ?? false;

        console.log(defaultRating, defaultIsFavorite);

        return {
          ...game,
          gameUserDetails: {
            gameId: game.id,
            isFavorite: defaultIsFavorite,
            rating: defaultRating,
          },
        };
      }

      return {
        ...game,
        gameUserDetails: {
          gameId: game.id,
          isFavorite: game.gameUserDetails?.isFavorite ?? false,
          rating: game.gameUserDetails?.rating ?? 0,
        },
      };
    }),
  } as UseQueryResult<GamesWithFavAndRating, ApiError>;
};
