import { getAllGames } from "@/services/games/get-all-games";
import { useQuery } from "@tanstack/react-query";

export const useGetGames = () =>
  useQuery({
    queryKey: ["games"] as const,
    queryFn: getAllGames,
    retry: false,
  });
