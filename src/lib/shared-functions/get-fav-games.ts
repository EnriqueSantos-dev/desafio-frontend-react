import { FavoriteGame } from "@/types";
import { Database } from "firebase-admin/database";

export async function getFavoriteGames(
  connection: Database,
  userId: string
): Promise<FavoriteGame[]> {
  let favGames: FavoriteGame[] = [];
  const favGamesSnapshot = await connection
    .ref(`games/users/${userId}/favorites`)
    .get();

  if (favGamesSnapshot.exists()) {
    Object.entries(favGamesSnapshot.val())
      .filter(([_, value]) => value)
      .forEach(([key]) => {
        favGames.push({
          game_id: parseInt(key.replace("id_", "")),
          user_id: userId,
        });
      });
  }

  return favGames;
}
