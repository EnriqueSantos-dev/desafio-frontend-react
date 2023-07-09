export type Game = {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
};

export type RatingGame = {
  game_id: number;
  user_id: string;
  rating: number;
};

export type FavoriteGame = {
  game_id: number;
  user_id: string;
};

export type GameUserDetails = {
  gameId: number;
  isFavorite: boolean;
  rating: number;
};

export type Games = Game[];
export type GameWithFavAndRating = Game & {
  gameUserDetails: GameUserDetails;
};
export type GamesWithFavAndRating = (Game & {
  gameUserDetails: GameUserDetails;
})[];
