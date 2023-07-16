import { Metadata } from "next";

import { Heading } from "@/components/shared/ui/heading";

export const metadata: Metadata = {
  title: "Community",
  description: "Discover the most loved and rated Items by our users",
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container h-full pb-6 pt-24">
      <section className="h-full">
        <Heading.Root>
          <Heading.Title>Community</Heading.Title>
          <Heading.Subtitle>
            Discover the most loved and rated Items by our users
          </Heading.Subtitle>
          <Heading.Separator />
        </Heading.Root>
        {children}
      </section>
    </main>
  );
}
