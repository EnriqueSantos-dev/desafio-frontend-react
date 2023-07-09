import { CardsGamesList } from "@/components/cards-games-list";
import { getFavAndRatingsGames } from "@/lib/shared-functions/get-fav-and-ratings-games";

export default async function Home() {
  const rantingsAndFavoritesGames = await getFavAndRatingsGames();

  return (
    <main className="container py-[20.375rem] md:py-[16.625rem]">
      <CardsGamesList ratingsAndFavoritesGames={rantingsAndFavoritesGames} />
    </main>
  );
}
