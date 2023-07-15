export const FIREBASE_REFS = {
  userRatingsAndFavorites: (userId: string) =>
    `games/users/${userId}/rantings_and_favorites` as const,
  communityCollection: "community" as const,
  communityDoc: (gameId: number, userId: string) =>
    `${gameId}_${userId}` as const,
};
