"use client";

import { Button } from "@/components/shared/ui/button";
import Image from "next/image";

export function ErrorGamesList() {
  return (
    <div className="grid place-items-center">
      <div className="flex flex-col items-center dark:text-neutral-100">
        <p className="text-center text-2xl font-bold">
          We encountered an issue while loading the data.
        </p>
        <Image
          src="/error.svg"
          alt="indicates error on get games"
          width={400}
          height={400}
          priority
          className="inline-block"
        />

        <div className="mt-10">
          <Button
            variant="blue"
            size="md"
            className="px-6"
            onClick={() => window.location.reload()}
          >
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
