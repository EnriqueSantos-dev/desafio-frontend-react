import { UserRecord } from "firebase-admin/auth";

export type SessionData = Pick<
  UserRecord,
  "uid" | "email" | "displayName" | "photoURL" | "passwordHash"
>;

export type UpdateUserProfile = {
  avatar?: string;
  name?: string;
  password?: string;
  email?: string;
};

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
  isFavorite: undefined | boolean;
  rating: undefined | number;
};

export type CommunityReview = {
  gameId: number;
  totalReviewsSum: number;
  totalFavorites: number;
  reviewsCount: number;
  avgRating: number;
};

export type CommunityReviewsAndGames = (CommunityReview & Game)[];
export type Games = Game[];
export type GameWithFavAndRating = Game & {
  gameUserDetails: GameUserDetails;
};
export type GamesWithFavAndRating = (Game & {
  gameUserDetails: GameUserDetails;
})[];
