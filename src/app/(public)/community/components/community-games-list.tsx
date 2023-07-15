"use client";

import { CardGameCommunity } from "@/components/card-game-community";
import { CardGameSkeleton } from "@/components/card-game-community-skeleton";
import { ErrorGamesList } from "@/components/error-games-list";

import { NotFoundResults } from "./not-found-results";

import { useGetCommunityReviewsAndGames } from "@/hooks/useGetCommunityReviews";

import { CommunityReview } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type CommunityGamesListProps = {
  communityReviews: CommunityReview[];
};

export function CommunityGamesList({
  communityReviews,
}: CommunityGamesListProps) {
  const router = useRouter();
  const {
    data: games,
    isLoading,
    error,
  } = useGetCommunityReviewsAndGames(communityReviews);

  useEffect(() => {
    // refresh segment to get updated state from firebase, once on mount
    router.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="container">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,400px))] place-content-center gap-4">
        {!error &&
          games &&
          games.length > 0 &&
          games.map((game, i) => (
            <CardGameCommunity key={game.id} {...game} delayAppear={i} />
          ))}

        {!error && games && games.length === 0 && <NotFoundResults />}

        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <CardGameSkeleton key={index} delay={index} />
          ))}
      </div>

      {error && <ErrorGamesList />}
    </section>
  );
}
