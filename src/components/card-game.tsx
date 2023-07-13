import { CSSProperties, memo } from "react";
import Link from "next/link";
import Image from "next/image";

import { GameWithFavAndRating } from "@/types";

import { CardGameDialog } from "@/components/card-game-dialog";
import { Button } from "@/components/shared/ui/button";
import { BadgeGamePlatform } from "@/components/badge-game-platform";
import { FavGame } from "@/components/fav-game";
import { Rating } from "@/components/rating";

type CardGameProps = GameWithFavAndRating;

export function CardGameComponent({
  id,
  thumbnail,
  title,
  release_date,
  game_url,
  short_description,
  platform,
  delayAppear: delay,
  gameUserDetails,
  ...props
}: CardGameProps & { delayAppear: number }) {
  const delayAppear = delay * 0.1;
  const styles = { "--delay": `${delayAppear}s` } as CSSProperties;

  return (
    <div
      className="grid animate-cardAppear grid-flow-row gap-4 overflow-hidden rounded-xl border-2 border-neutral-200 dark:border-neutral-800"
      style={styles}
    >
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
          <div className="flex items-center justify-between">
            <h2 className="line-clamp-1 flex-1 text-ellipsis text-lg font-bold text-neutral-900 hover:underline dark:text-neutral-100">
              <Link
                href={game_url}
                className="hover:underline focus-visible:underline focus-visible:outline-none"
              >
                {title}
              </Link>
            </h2>
            <FavGame gameId={id} isFav={!!gameUserDetails.isFavorite} />
          </div>

          <div className="1">
            <Rating gameId={id} initialRating={gameUserDetails.rating ?? 0} />
          </div>

          <CardGameDialog
            id={id}
            thumbnail={thumbnail}
            short_description={short_description}
            title={title}
            release_date={release_date}
            game_url={game_url}
            platform={platform}
            {...props}
          />
        </div>

        <p
          className="mt-2 line-clamp-2 text-ellipsis text-sm/5 text-neutral-700 dark:text-neutral-200"
          aria-label={short_description}
        >
          {short_description}
        </p>

        <div className="mt-6 flex items-center justify-between text-sm font-medium dark:text-white">
          <Button
            variant="green"
            size="md"
            className="pointer-events-none w-32"
            tabIndex={-1}
          >
            Available for
          </Button>
          <BadgeGamePlatform platform={platform} />
        </div>

        <div className="mt-3 flex items-center justify-between  pb-2 text-sm font-medium dark:text-white">
          <Button
            variant="blue"
            size="md"
            className="pointer-events-none w-32"
            tabIndex={-1}
          >
            Release
          </Button>
          <span className="flex-1 text-right text-neutral-900 dark:text-neutral-100">
            {Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
              new Date(release_date)
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export const CardGame = memo(CardGameComponent);
