import { RatingGame } from "@/types";

export async function getGamesRatings(
  connection: FirebaseFirestore.Firestore,
  userId: string
): Promise<RatingGame[]> {
  const ratingsGamesRef = connection.collection("ratings");
  const querySnapshotRatings = await ratingsGamesRef
    .where("user_id", "==", userId)
    .get();

  const ratingsGames: RatingGame[] = querySnapshotRatings.docs.map(
    (doc) => doc.data() as RatingGame
  );

  return ratingsGames;
}
