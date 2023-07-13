import { GamesList } from "@/components/games-list";
import { getFavAndRatingsGames } from "@/lib/shared-functions/get-fav-and-ratings-games";

export default async function Home() {
  return (
    <main className="container py-[23.125rem] lg:py-[22.625rem] xl:py-[15.625rem]">
      <GamesList />
    </main>
  );
}
