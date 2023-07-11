import { useMemo } from "react";

import { useSearchParams } from "next/navigation";

import { GamesWithFavAndRating } from "@/types";

export const useFilteredGameList = (
  games: GamesWithFavAndRating | undefined
) => {
  const searchParams = useSearchParams();
  const sortParam = searchParams.get("sort") ?? "";
  const orderParam = searchParams.get("order") ?? "";
  const searchParam = searchParams.get("search") ?? "";
  const genreParam = searchParams.get("genre") ?? "";
  const favoriteParam = searchParams.get("favorites") ?? "";

  const filteredGames = useMemo(() => {
    if (!games) return [] as GamesWithFavAndRating;

    const gamesList = games.filter((game) => {
      const searchMatch =
        game.title.toLowerCase().includes(searchParam.toLowerCase()) ||
        searchParam === "";
      const genreMatch = game.genre === genreParam || genreParam === "";
      const favoriteMatch =
        (favoriteParam === "active" && game.gameUserDetails.isFavorite) ||
        favoriteParam === "";

      return searchMatch && genreMatch && favoriteMatch;
    });

    if (!sortParam || sortParam !== "rating") return gamesList;
    if (orderParam === "asc")
      return gamesList.sort(
        (a, b) => a.gameUserDetails.rating - b.gameUserDetails.rating
      );

    if (orderParam === "desc")
      return gamesList.sort(
        (a, b) => b.gameUserDetails.rating - a.gameUserDetails.rating
      );

    return gamesList;
  }, [games, sortParam, orderParam, searchParam, genreParam, favoriteParam]);

  return { filteredGames };
};
