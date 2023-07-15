"use client";

import { Button } from "@/components/shared/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function NotFoundResults() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-4 pt-20">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        No results found
      </h2>
      <Image
        src="/not-found-results.svg"
        width={500}
        height={500}
        priority
        alt="not found results illustration"
      />

      <Button variant="blue" size="md" onClick={() => router.push("/")}>
        Go home
      </Button>
    </div>
  );
}
