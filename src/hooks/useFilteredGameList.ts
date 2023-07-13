import { useMemo } from "react";

import { useSearchParams } from "next/navigation";

import { GameUserDetails, GamesWithFavAndRating } from "@/types";
import { useGetGames } from "@/hooks/useGetGames";

export const useFilteredGameList = (
  favGamesAndRating: GameUserDetails[] = []
) => {
  const query = useGetGames(favGamesAndRating);
  const searchParams = useSearchParams();
  const sortParam = searchParams.get("sort") ?? "";
  const orderParam = searchParams.get("order") ?? "";
  const searchParam = searchParams.get("search") ?? "";
  const genreParam = searchParams.get("genre") ?? "";
  const favoriteParam = searchParams.get("filter") ?? "";

  const filteredGames = useMemo(() => {
    if (!query.data) return [] as GamesWithFavAndRating;

    const gamesList = query.data.filter((game) => {
      const searchMatch =
        game.title.toLowerCase().includes(searchParam.toLowerCase()) ||
        searchParam === "";
      const genreMatch = game.genre === genreParam || genreParam === "";
      const favoriteMatch =
        (favoriteParam === "favorites" && game.gameUserDetails.isFavorite) ||
        favoriteParam === "";

      return searchMatch && genreMatch && favoriteMatch;
    });

    if (!sortParam || sortParam !== "rating") return gamesList;
    if (orderParam === "asc")
      return gamesList.sort(
        // force non-null assertion because we know that the rating is defined in query.data to default value
        (a, b) => a.gameUserDetails.rating! - b.gameUserDetails.rating!
      );

    if (orderParam === "desc")
      return gamesList.sort(
        // force non-null assertion because we know that the rating is defined in query.data to default value
        (a, b) => b.gameUserDetails.rating! - a.gameUserDetails.rating!
      );

    return gamesList;
  }, [
    query.data,
    sortParam,
    orderParam,
    searchParam,
    genreParam,
    favoriteParam,
  ]);

  return { ...query, data: filteredGames };
};
