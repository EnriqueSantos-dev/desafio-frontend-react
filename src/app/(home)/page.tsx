import { GamesList } from "@/components/games-list";

export default async function Home() {
  return (
    <main className="container py-[23.125rem] lg:py-[22.625rem] xl:py-[15.625rem]">
      <GamesList />
    </main>
  );
}
