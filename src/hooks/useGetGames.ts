import { getAllGames } from "@/services/games/get-all-games";
import { Games } from "@/types";
import { ApiError } from "@/types/api-error";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export const useGetGames = (): UseQueryResult<Games, ApiError> => {
  return useQuery({
    queryKey: ["games"] as const,
    queryFn: getAllGames,
    retry: false,
  });
};
