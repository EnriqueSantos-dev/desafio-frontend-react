import { Heading } from "@/components/shared/ui/heading";

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      {children}
    </main>
  );
}
