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
        return { ...game, gameUserDetails: gameFound };
      }

      return game;
    }),
  } as UseQueryResult<GamesWithFavAndRating, ApiError>;
};
