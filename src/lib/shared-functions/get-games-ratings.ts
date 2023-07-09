import { RatingGame } from "@/types";
import { Database } from "firebase-admin/database";

export async function getGamesRatings(
  connection: Database,
  userId: string
): Promise<RatingGame[]> {
  let ratings: RatingGame[] = [];
  const ratingsSnapshot = await connection.ref("games-details/ratings").get();

  ratingsSnapshot.forEach((data) => {
    const rating = data.val();

    if (rating.user_id === userId) {
      ratings.push(rating);
    }
  });

  return ratings;
}
