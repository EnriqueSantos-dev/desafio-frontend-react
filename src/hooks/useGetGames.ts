import { UseQueryResult, useQuery } from "@tanstack/react-query";

import { getAllGames } from "@/services/games/get-all-games";

import { GameUserDetails, GamesWithFavAndRating } from "@/types";
import { useEffect, useState } from "react";
import { ApiError } from "@/types/api-error";

type ResultQuery = UseQueryResult<GamesWithFavAndRating, ApiError>;

export const useGetGames = (favGamesAndRatings: GameUserDetails[]) => {
  const [isMounted, setIsMounted] = useState(false);

  const query = useQuery({
    queryKey: ["games"] as const,
    queryFn: getAllGames,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return { ...query } as ResultQuery;
  }

  return {
    ...query,
    data: query.data?.map((game) => {
      const favGame = favGamesAndRatings.find(
        (favGame) => favGame.gameId === game.id
      );

      if (favGame) {
        return {
          ...game,
          gameUserDetails: {
            gameId: game.id,
            isFavorite:
              typeof game.gameUserDetails.isFavorite !== "undefined"
                ? game.gameUserDetails.isFavorite
                : favGame.isFavorite,
            rating:
              typeof game.gameUserDetails.rating !== "undefined"
                ? game.gameUserDetails.rating
                : favGame.rating,
          },
        };
      }

      return {
        ...game,
        gameUserDetails: {
          gameId: game.id,
          isFavorite: false,
          rating: 0,
        },
      };
    }),
  } as ResultQuery;
};
