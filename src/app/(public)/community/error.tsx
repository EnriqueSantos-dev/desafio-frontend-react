"use client";

import { ErrorGamesList } from "@/components/error-games-list";

export default function ErrorBoundaryCommunityPage() {
  return (
    <ErrorGamesList message="Ops! not possible load community data in moment" />
  );
}
