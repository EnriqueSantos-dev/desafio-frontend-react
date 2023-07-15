import { useToast } from "@/hooks/useToast";
import { getAllGames } from "@/services/games/get-all-games";

import { CommunityReview, CommunityReviewsAndGames } from "@/types";

import { ApiError } from "@/types/api-error";

import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useGetCommunityReviewsAndGames = (reviews: CommunityReview[]) => {
  const { error } = useToast();
  const query = useQuery<Awaited<ReturnType<typeof getAllGames>>, ApiError>({
    queryKey: ["community-reviews"],
    queryFn: getAllGames,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.error) error(query.error.message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.error]);

  return {
    ...query,
    data: query.data
      ?.filter((game) => {
        return reviews.find((review) => review.gameId === game.id);
      })
      .map((game, i) => {
        const { gameUserDetails, ...rest } = game;

        const gameReviewIndex = reviews.findIndex(
          (review) => review.gameId === game.id
        );

        if (gameReviewIndex > -1) {
          return {
            ...rest,
            ...reviews[i],
          };
        }
      }),
  } as UseQueryResult<CommunityReviewsAndGames, ApiError>;
};
