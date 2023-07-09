import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { getAllGames } from "@/services/games/get-all-games";

import { GamesWithFavAndRating } from "@/types";
import { ApiError } from "@/types/api-error";

export const useGetGames = (): UseQueryResult<
  GamesWithFavAndRating,
  ApiError
> => {
  return useQuery({
    queryKey: ["games"] as const,
    queryFn: getAllGames,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity, // cache forever
  });
};
