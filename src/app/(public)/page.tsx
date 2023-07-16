import { ContainerInputs } from "@/components/container-inputs";
import { GamesList } from "@/components/games-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Pick your favorite games, rate them and share your opinion",
};

export default async function Home() {
  return (
    <>
      <main className="container h-full">
        <section className="h-full pt-[65px]">
          <ContainerInputs />
          <GamesList />
        </section>
      </main>
    </>
  );
}
