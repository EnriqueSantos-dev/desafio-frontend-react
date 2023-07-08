"use client";

import Image from "next/image";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { Games } from "@/types";

import { useGetGames } from "@/hooks/useGetGames";

import { CardGame } from "./card-game";
import { CardGameSkeleton } from "./card-game-skeleton";
import { useToast } from "@/hooks/useToast";

export function CardsGamesList() {
  const { data: games, error, isLoading } = useGetGames();
  const { error: toastError } = useToast();
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
      toastError(error.message);
    }
  }, [error, toastError]);

  return (
    <section>
      <div className="grid grid-cols-1 items-stretch justify-center gap-4 sm:grid-cols-[80%] md:grid-cols-2 lg:grid-cols-[repeat(3,minmax(200px,380px))]">
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
              alt="indicates error on get games"
              width={400}
              height={400}
              priority
              className="inline-block drop-shadow-errorShadow"
            />
          </div>
        </div>
      )}

      {!error && !isLoading && filteredGames.length === 0 && (
        <div className="grid place-items-center">
          <div className="flex flex-col items-center gap-20 dark:text-neutral-100">
            <p className="text-3xl font-bold">Game not found</p>

            <Image
              src="/not-found-games.svg"
              width={300}
              height={300}
              priority
              alt="indicates that it did not find the resources"
              className="drop-shadow-errorShadow"
            />
          </div>
        </div>
      )}
    </section>
  );
}
