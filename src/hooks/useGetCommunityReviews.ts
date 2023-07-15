import { getAllGames } from "@/services/games/get-all-games";

import { CommunityReview, CommunityReviewsAndGames } from "@/types";

import { ApiError } from "@/types/api-error";

import { UseQueryResult, useQuery } from "@tanstack/react-query";

export const useGetCommunityReviewsAndGames = (reviews: CommunityReview[]) => {
  const query = useQuery({
    queryKey: ["community-reviews"],
    queryFn: getAllGames,
    retry: false,
    refetchOnWindowFocus: false,
  });

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
