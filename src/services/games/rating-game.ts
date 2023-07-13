import { apiInternal } from "@/lib/axios";

export type RatingGameInput = {
  gameId: number;
  rating: number;
};

export type RatingGameResponse = {
  message: string;
};

export async function ratingGame({
  gameId,
  rating,
}: RatingGameInput): Promise<RatingGameResponse> {
  const { data } = await apiInternal.put("/api/games/rating", {
    gameId,
    rating,
  });
  return data;
}
