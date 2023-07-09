import { CardsGamesList } from "@/components/cards-games-list";
import { getAdminFireStore } from "@/config/firebase/server";
import { getFavoriteGames } from "@/lib/shared-functions/get-fav-games";
import { getGamesRatings } from "@/lib/shared-functions/get-games-ratings";
import { getAuthSession } from "@/services/users/get-auth-session";
import { GameUserDetails } from "@/types";

export default async function Home() {
  const session = await getAuthSession();
  let mappedGames: GameUserDetails[] = [];
  const dbConnection = getAdminFireStore();

  if (session) {
    await Promise.all([
      getFavoriteGames(dbConnection, session.uid),
      getGamesRatings(dbConnection, session.uid),
    ])
      .then(([favGames, ratings]) => {
        if (favGames.length === 0 && ratings.length === 0) return;

        if (favGames.length === 0 && ratings.length > 0) {
          mappedGames = ratings.map((rating) => ({
            gameId: rating.game_id,
            isFavorite: false,
            rating: rating.rating,
          }));

          return;
        }

        if (ratings.length === 0 && favGames.length > 0) {
          mappedGames = favGames.map((game) => ({
            gameId: game.game_id,
            isFavorite: true,
            rating: 0,
          }));

          return;
        }

        if (ratings.length > 0 && favGames.length > 0) {
          for (let i = 0; i < ratings.length; i++) {
            if (ratings[i].game_id === favGames[i].game_id) {
              mappedGames.push({
                gameId: ratings[i].game_id,
                isFavorite: true,
                rating: ratings[i].rating,
              });
            }

            mappedGames.push({
              gameId: favGames[i].game_id,
              isFavorite: true,
              rating: 0,
            });
          }

          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <main className="container py-[20.375rem] md:py-[16.625rem]">
      <CardsGamesList ratingsAndFavoritesGames={mappedGames} />
    </main>
  );
}
