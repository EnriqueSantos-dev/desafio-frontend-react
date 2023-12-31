"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useToast } from "@/hooks/useToast";
import { useFilteredGameList } from "@/hooks/useFilteredGameList";

import { useAuthContext } from "@/contexts/auth-context";

import { ErrorGamesList } from "@/components/error-games-list";

import { cn } from "@/lib/utils";

import { CardGame } from "./card-game";
import { CardGameSkeleton } from "./card-game-skeleton";

export function GamesList() {
  const { userFavoritesGames } = useAuthContext();
  const router = useRouter();
  const {
    data: filteredGames,
    error,
    isLoading,
  } = useFilteredGameList(userFavoritesGames);
  const { error: toastError } = useToast();

  useEffect(() => {
    if (error) {
      toastError(error.message);
    }
  }, [error, toastError]);

  useEffect(() => {
    router.refresh();
    // this is necessary to get updated cookies once when page is loaded
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={cn("xl:pt-[9.3125rem] pb-12 h-full", {
        "pt-[13.3125rem]": error || isLoading,
        "pt-[16.3125rem]": !error && !isLoading,
      })}
    >
      {error && <ErrorGamesList />}

      {(filteredGames.length > 0 || isLoading) && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,420px))] place-content-center gap-4 pb-12">
          {filteredGames.length > 0 &&
            filteredGames.map((game, i) => (
              <CardGame key={game.id} {...game} delayAppear={i} />
            ))}

          {isLoading &&
            Array.from({ length: 6 }).map((_, index) => (
              <CardGameSkeleton key={index} delay={index} />
            ))}
        </div>
      )}

      {filteredGames.length === 0 && !isLoading && !error && (
        <div className="grid h-full place-items-center">
          <div className="flex flex-col items-center gap-10 dark:text-neutral-100">
            <p className="text-xl font-bold md:text-3xl">Game not found</p>

            <Image
              src="/not-found-games.svg"
              width={300}
              height={300}
              priority
              alt="indicates that it did not find the resources"
            />
          </div>
        </div>
      )}
    </div>
  );
}
