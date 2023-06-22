import { Game } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { CardGameDialog } from "./card-game-dialog";
import { Button } from "./shared/ui/button";

type CardGameProps = Game;

export function CardGameComponent({
  thumbnail,
  title,
  release_date,
  game_url,
  short_description,
  platform,
  ...props
}: CardGameProps) {
  return (
    <div className="grid grid-flow-row gap-4 overflow-hidden rounded-xl border-2 border-neutral-200 dark:border-neutral-800">
      <div className="relative h-56 w-full overflow-hidden rounded-tr-lg">
        <Image
          src={thumbnail}
          fill
          alt={title}
          sizes="200px"
          quality={90}
          className="transition-transform hover:scale-105"
        />
      </div>

      <div className="flex h-max flex-col px-4 pb-4">
        <div className="flex flex-col justify-between gap-2 border-b border-neutral-200 pb-2 pt-1 dark:border-neutral-800">
          <h2 className="line-clamp-1 text-ellipsis text-lg font-bold text-neutral-900 hover:underline dark:text-neutral-100">
            <Link
              href={game_url}
              className="hover:underline focus-visible:underline focus-visible:outline-none"
            >
              {title}
            </Link>
          </h2>

          <CardGameDialog
            {...props}
            thumbnail={thumbnail}
            short_description={short_description}
            title={title}
            release_date={release_date}
            game_url={game_url}
            platform={platform}
          />
        </div>

        <p
          className="mt-2 line-clamp-2 text-ellipsis text-sm/5 text-neutral-700 dark:text-neutral-200"
          aria-label={short_description}
        >
          {short_description}
        </p>

        <div className="mt-6 flex items-center justify-between text-sm font-medium dark:text-white">
          <Button variant="green" size="md">
            Available for
          </Button>
          <span className="flex-1 text-right">{platform}</span>
        </div>

        <div className="mt-3 flex items-center justify-between text-sm font-medium dark:text-white">
          <Button variant="blue" size="md">
            Release
          </Button>
          <span className="flex-1 text-right text-neutral-900 dark:text-neutral-100">
            {release_date}
          </span>
        </div>
      </div>
    </div>
  );
}

export const CardGame = memo(CardGameComponent);
