import { getDatabaseAdmin } from "@/config/firebase/server";

import { getAuthSession } from "@/services/users/get-auth-session";

import { GameUserDetails } from "@/types";

export async function getFavAndRatingsGames() {
  const session = await getAuthSession();

  if (!session) {
    return [];
  }

  const connection = getDatabaseAdmin();
  let rantingsAndFavGames: GameUserDetails[] = [];

  const snapshot = await connection
    .ref(`games/users/${session.uid}/ratings_and_favorites`)
    .get();

  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.val();

      rantingsAndFavGames.push({
        gameId: parseInt(childSnapshot!.key!.replace("id_", "")),
        isFavorite: data.isFavorite,
        rating: data.rating,
      });
    });
  }

  return rantingsAndFavGames;
}
