import { CardsGamesList } from "@/components/cards-games-list";
import { getFavAndRatingsGames } from "@/lib/shared-functions/get-fav-and-ratings-games";

export default async function Home() {
  const rantingsAndFavoritesGames = await getFavAndRatingsGames();

  return (
    <main className="container py-[23.125rem] lg:py-[20.625rem] xl:py-[15.625rem]">
      <CardsGamesList ratingsAndFavoritesGames={rantingsAndFavoritesGames} />
    </main>
  );
}
