import { Heading } from "@/components/shared/ui/heading";
import { CommunityGamesList } from "./components/community-games-list";
import { getCommunityReviews } from "@/services/community/get-community-reviews";

export default async function CommunityPage() {
  const communityReviews = await getCommunityReviews();

  return (
    <main className="container pt-28">
      <div className="mb-10">
        <Heading.Root>
          <Heading.Title>Community</Heading.Title>
          <Heading.Subtitle>
            Discover the most loved and rated Items by our users
          </Heading.Subtitle>
          <Heading.Separator />
        </Heading.Root>
      </div>
      <CommunityGamesList communityReviews={communityReviews} />
    </main>
  );
}
