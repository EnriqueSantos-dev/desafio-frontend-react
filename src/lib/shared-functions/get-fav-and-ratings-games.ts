import { getDatabaseAdmin } from "@/config/firebase/server";

import { getAuthSession } from "@/services/users/get-auth-session";

import { GameUserDetails } from "@/types";

import { getFavoriteGames } from "@/lib/shared-functions/get-fav-games";
import { getGamesRatings } from "@/lib/shared-functions/get-games-ratings";

export async function getFavAndRatingsGames() {
  const session = await getAuthSession();
  let mappedGames: GameUserDetails[] = [];

  if (session) {
    const connection = getDatabaseAdmin();
    const favoritesGames = await getFavoriteGames(connection, session.uid);
    const ratingsUserGames = await getGamesRatings(connection, session.uid);

    const mergedList = favoritesGames.reduce(
      (result, item, i) => {
        let existingItem = result.find(
          (mergedItem) => mergedItem.game_id === item.game_id
        );

        if (existingItem) {
          // Item já existe, mesclar informações
          existingItem = Object.assign(existingItem, {
            ...item,
            isFavorite: true,
          });
        } else {
          // Item não existe, adicionar à lista
          result.push({
            ...item,
            rating: result[i]?.rating ?? 0,
            isFavorite: true,
          });
        }

        return result;
      },
      [
        ...ratingsUserGames.map((ratingGame) => ({
          ...ratingGame,
          isFavorite: false,
        })),
      ]
    );

    mappedGames = mergedList.map((mergedGame) => ({
      gameId: mergedGame.game_id,
      isFavorite: mergedGame.isFavorite,
      rating: mergedGame.rating,
    }));
  }

  return mappedGames;
}
