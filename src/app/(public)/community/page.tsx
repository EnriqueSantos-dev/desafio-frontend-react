import { CommunityGamesList } from "./components/community-games-list";
import { getCommunityReviews } from "@/services/community/get-community-reviews";

export default async function CommunityPage() {
  const communityReviews = await getCommunityReviews();

  return (
    <main className="pt-28">
      <CommunityGamesList communityReviews={communityReviews} />
    </main>
  );
}
