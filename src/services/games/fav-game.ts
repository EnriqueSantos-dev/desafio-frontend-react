import { apiInternal } from "@/lib/axios";

export type FavGameInput = {
  gameId: number;
  isFav: boolean;
};

export type FavGameResponse = {
  message: string;
};

export async function favGame({
  gameId,
  isFav,
}: FavGameInput): Promise<FavGameResponse> {
  const { data } = await apiInternal.post<FavGameResponse>(
    "/api/games/favorite",
    {
      gameId,
      isFav,
    }
  );
  return data;
}
