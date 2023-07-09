import { apiInternal } from "@/lib/axios";

export type FavGameInput = {
  gameId: number;
};

export type FavGameResponse = {
  message: string;
};

export async function favGame({
  gameId,
}: FavGameInput): Promise<FavGameResponse> {
  const { data } = await apiInternal.post<FavGameResponse>(
    "/api/favorite-game",
    {
      gameId,
    }
  );
  return data;
}
