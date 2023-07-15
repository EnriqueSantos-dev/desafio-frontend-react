import { FIREBASE_REFS } from "@/utils/get-firebase-refs";

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
    .ref(FIREBASE_REFS.userRatingsAndFavorites(session.uid))
    .get();

  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.val();

      rantingsAndFavGames.push({
        gameId: parseInt(childSnapshot!.key!.replace("id_", "")),
        isFavorite: data.isFavorite,
        rating: data.rating ?? 0,
      });
    });
  }

  return rantingsAndFavGames;
}
