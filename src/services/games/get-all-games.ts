import { api } from "@/lib/axios";
import { Games, GamesWithFavAndRating } from "@/types";

const TIMEOUT = 5000;

export async function getAllGames(): Promise<GamesWithFavAndRating> {
  const { data } = await api.get<Games>("/data", { timeout: TIMEOUT });
  return (
    data?.map((game) => ({
      ...game,
      gameUserDetails: { gameId: game.id, isFavorite: false, rating: 0 },
    })) ?? []
  );
}
