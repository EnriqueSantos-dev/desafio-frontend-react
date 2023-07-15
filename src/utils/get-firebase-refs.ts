export const FIREBASE_REFS = {
  userRatingsAndFavorites: (userId: string) =>
    `games/users/${userId}/rantings_and_favorites` as const,
  communityReviewsAndFavorites: (gameId: string) =>
    `community/id_${gameId}` as const,
};
