"use client";

import Image from "next/image";
import { useEffect } from "react";

import { GameUserDetails } from "@/types";

import { CardGame } from "./card-game";
import { CardGameSkeleton } from "./card-game-skeleton";
import { useToast } from "@/hooks/useToast";
import { useFilteredGameList } from "@/hooks/useFilteredGameList";

type GamesListProps = {
  ratingsAndFavoritesGames: GameUserDetails[];
};

export function GamesList({ ratingsAndFavoritesGames }: GamesListProps) {
  const {
    data: filteredGames,
    error,
    isLoading,
  } = useFilteredGameList(ratingsAndFavoritesGames);
  const { error: toastError } = useToast();

  useEffect(() => {
    if (error) {
      toastError(error.message);
    }
  }, [error, toastError]);

  return (
    <section>
      <div className="grid grid-cols-[minmax(300px,380px)] items-stretch justify-center gap-4 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(360px,400px))]">
        {!error &&
          filteredGames &&
          filteredGames.map((game, i) => (
            <CardGame key={game.id} {...game} delayAppear={i} />
          ))}

        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <CardGameSkeleton key={index} delay={index} />
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
