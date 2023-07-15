import { ContainerInputs } from "@/components/container-inputs";
import { GamesList } from "@/components/games-list";

export default async function Home() {
  return (
    <>
      <ContainerInputs />
      <main className="container py-[23.125rem] lg:py-[22.625rem] xl:py-[15.625rem]">
        <GamesList />
      </main>
    </>
  );
}
