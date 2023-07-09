import { FavoriteGame } from "@/types";

export async function getFavoriteGames(
  connection: FirebaseFirestore.Firestore,
  userId: string
): Promise<FavoriteGame[]> {
  const favGamesRef = connection.collection("fav_games");
  const querySnapshot = await favGamesRef.where("user_id", "==", userId).get();

  const favGames: FavoriteGame[] = querySnapshot.docs.map(
    (doc) => doc.data() as FavoriteGame
  );

  return favGames;
}
