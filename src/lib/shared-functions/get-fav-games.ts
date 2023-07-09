import { FavoriteGame } from "@/types";
import { Database } from "firebase-admin/database";

export async function getFavoriteGames(
  connection: Database,
  userId: string
): Promise<FavoriteGame[]> {
  const favGames: FavoriteGame[] = [];
  const favGamesSnapshot = await connection
    .ref("games-details/favorite_games")
    .get();

  favGamesSnapshot.forEach((data) => {
    const fav = data.val();

    if (fav.user_id === userId) {
      favGames.push(fav);
    }
  });

  return favGames;
}
