import { RatingGame } from "@/types";
import { Database } from "firebase-admin/database";

export async function getGamesRatings(
  connection: Database,
  userId: string
): Promise<RatingGame[]> {
  let ratings: RatingGame[] = [];
  const ratingsSnapshot = await connection
    .ref(`games/users/${userId}/ratings`)
    .get();

  if (ratingsSnapshot.exists()) {
    Object.entries(ratingsSnapshot.val()).forEach(([key, value]) => {
      ratings.push({
        game_id: parseInt(key.replace("id_", "")),
        rating: Number(value),
        user_id: userId,
      });
    });
  }

  return ratings;
}
