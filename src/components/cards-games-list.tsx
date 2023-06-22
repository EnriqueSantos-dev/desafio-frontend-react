"use client";

import { useGetGames } from "@/hooks/useGetGames";
import { Games } from "@/types";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
import { CardGame } from "./card-game";
import { CardGameSkeleton } from "./card-game-skeleton";

export function CardsGamesList() {
  const { data: games, error, isLoading } = useGetGames();
  const searchParams = useSearchParams();

  const filteredGames = useMemo(() => {
    if (!games) return [] as Games;
    const searchValue = searchParams.get("search");
    const genreValue = searchParams.get("genre");

    if (searchValue && genreValue) {
      return games.filter(
        (game) =>
          game.title.toLowerCase().includes(searchValue) &&
          game.genre === genreValue
      );
    }

    if (searchValue && !genreValue) {
      return games.filter((game) =>
        game.title.toLowerCase().includes(searchValue)
      );
    }

    if (!searchValue && genreValue) {
      return games.filter((game) => game.genre === genreValue);
    }

    return games;
  }, [games, searchParams]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <section>
      <div className="xs:grid-cols-1 grid items-stretch justify-center gap-4 sm:grid-cols-[80%] md:grid-cols-2 lg:grid-cols-[repeat(3,minmax(200px,380px))]">
        {!error &&
          filteredGames &&
          filteredGames.map((game) => <CardGame key={game.id} {...game} />)}

        {isLoading &&
          Array.from({ length: 10 }).map((_, index) => (
            <CardGameSkeleton key={index} />
          ))}
      </div>

      {error && (
        <div className="grid place-items-center">
          <div className="flex flex-col items-center gap-20 dark:text-neutral-100">
            <p className="text-3xl font-bold">Let&apos; go, reload page.</p>
            <Image
              src="/error-img.png"
              alt="404"
              width={300}
              height={300}
              className="inline-block drop-shadow-errorShadow"
            />
          </div>
        </div>
      )}
    </section>
  );
}
