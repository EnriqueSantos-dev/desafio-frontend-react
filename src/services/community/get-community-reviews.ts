import { FIREBASE_REFS } from "@/utils/get-firebase-refs";

import { getFirestoreAdmin } from "@/config/firebase/server";
import { CommunityReview } from "@/types";

export async function getCommunityReviews(): Promise<CommunityReview[]> {
  const snapshot = await getFirestoreAdmin()
    .collection(FIREBASE_REFS.communityCollection)
    .get();

  const data = snapshot.docs
    .map((doc) => {
      return {
        gameId: parseInt(doc.id.split("_")[0]),
        rating: doc.data().rating ?? 0,
        fav: doc.data()?.fav ?? 0,
      };
    })
    .reduce((acc, curr) => {
      const copy = [...acc];
      const existingIndex = acc.findIndex(
        (item) => item.gameId === curr.gameId
      );

      if (existingIndex !== -1) {
        copy[existingIndex].totalReviewsSum += curr.rating;
        copy[existingIndex].totalFavorites += curr.fav;
        copy[existingIndex].reviewsCount += 1;
        return copy;
      }

      copy.push({
        gameId: curr.gameId,
        totalReviewsSum: curr.rating,
        totalFavorites: curr.fav,
        reviewsCount: 1,
      });

      return copy;
    }, [] as Array<{ gameId: number; totalReviewsSum: number; totalFavorites: number; reviewsCount: number }>)
    .map((item) => {
      return {
        ...item,
        avgRating: item.totalReviewsSum / item.reviewsCount,
      };
    });

  return data;
}
