import { CommunityGamesList } from "./components/community-games-list";
import { getCommunityReviews } from "@/services/community/get-community-reviews";

export default async function CommunityPage() {
  const communityReviews = await getCommunityReviews();

  return <CommunityGamesList communityReviews={communityReviews} />;
}
