"use client";

import Image from "next/image";
import { useEffect, useMemo } from "react";

import { GameUserDetails } from "@/types";

import { useToast } from "@/hooks/useToast";
import { useFilteredGameList } from "@/hooks/useFilteredGameList";

import { ErrorGamesList } from "@/components/error-games-list";

import { CardGame } from "./card-game";
import { CardGameSkeleton } from "./card-game-skeleton";
import { useAuthContext } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function GamesList() {
  const { userFavoritesGames } = useAuthContext();
  const {
    data: filteredGames,
    error,
    isLoading,
  } = useFilteredGameList(userFavoritesGames);
  const { error: toastError } = useToast();
  const router = useRouter();

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
      className={cn("xl:pt-[9.3125rem] pb-12", {
        "pt-[13.3125rem]": error || isLoading,
        "pt-[16.3125rem]": !error && !isLoading && filteredGames.length !== 0,
      })}
    >
      {error && <ErrorGamesList />}

      {!error && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,420px))] place-content-center gap-4">
          {filteredGames &&
            filteredGames.map((game, i) => (
              <CardGame key={game.id} {...game} delayAppear={i} />
            ))}

          {isLoading &&
            Array.from({ length: 6 }).map((_, index) => (
              <CardGameSkeleton key={index} delay={index} />
            ))}
        </div>
      )}

      {!isLoading && !error && filteredGames.length === 0 && (
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
    </div>
  );
}
