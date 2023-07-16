"use client";

import { Button } from "@/components/shared/ui/button";
import Image from "next/image";

const DEFAULT_ERROR_MESSAGE = "We encountered an issue while loading the data.";

type ErrorGamesListProps = {
  message?: string;
  onResetError?: () => void;
};

export function ErrorGamesList({
  message = DEFAULT_ERROR_MESSAGE,
  onResetError,
}: ErrorGamesListProps) {
  const handleResetError = () => {
    if (onResetError) {
      onResetError();
      return;
    }

    window.location.reload();
  };

  return (
    <div className="grid h-full place-items-center">
      <div className="flex flex-col items-center dark:text-neutral-100">
        <p className="text-center text-xl font-bold md:text-2xl">{message}</p>
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
            onClick={handleResetError}
          >
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
