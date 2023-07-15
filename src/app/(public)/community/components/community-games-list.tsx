"use client";

import { CardGameCommunity } from "@/components/card-game-community";
import { CardGameSkeleton } from "@/components/card-game-community-skeleton";
import { ErrorGamesList } from "@/components/error-games-list";
import { useGetCommunityReviewsAndGames } from "@/hooks/useGetCommunityReviews";
import { CommunityReview } from "@/types";

type CommunityGamesListProps = {
  communityReviews: CommunityReview[];
};

export function CommunityGamesList({
  communityReviews,
}: CommunityGamesListProps) {
  const {
    data: games,
    isLoading,
    error,
  } = useGetCommunityReviewsAndGames(communityReviews);

  return (
    <section className="container">
      <div className="grid grid-flow-col grid-cols-[minmax(300px,400px)] place-content-center">
        {!error &&
          games &&
          games.map((game) => <CardGameCommunity key={game.id} {...game} />)}

        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <CardGameSkeleton key={index} delay={index} />
          ))}
      </div>

      {error && <ErrorGamesList />}
    </section>
  );
}
