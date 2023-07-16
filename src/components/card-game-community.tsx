import { CSSProperties } from "react";

import Image from "next/image";
import Link from "next/link";

import { CommunityReview, GameWithFavAndRating } from "@/types";

import { RatingPrecision } from "@/components/rating-precision";
import { FavGame } from "@/components/fav-game";

type CardGameCommunityProps = CommunityReview &
  Pick<
    GameWithFavAndRating,
    "short_description" | "thumbnail" | "title" | "game_url"
  >;

export function CardGameCommunity({
  totalReviewsSum,
  reviewsCount,
  avgRating,
  title,
  thumbnail,
  game_url,
  short_description,
  totalFavorites,
  delayAppear: delay,
}: CardGameCommunityProps & { delayAppear: number }) {
  const delayAppear = delay * 0.1;
  const styles = { "--delay": `${delayAppear}s` } as CSSProperties;

  return (
    <div
      className="grid animate-cardAppear grid-flow-row gap-4 overflow-hidden rounded-xl border-2 border-neutral-200 dark:border-neutral-800"
      style={styles}
    >
      <div className="relative aspect-[4/2] max-w-full overflow-hidden md:aspect-[4/2]">
        <Image
          src={thumbnail}
          fill
          alt={title}
          sizes="200px"
          quality={100}
          className="object-fill transition-transform hover:scale-105"
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

            {totalFavorites > 0 && (
              <div className="flex items-center gap-3">
                <FavGame gameId={0} isFav={true} disabled />
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  {new Intl.NumberFormat("en-US", {
                    compactDisplay: "short",
                    notation: "compact",
                  }).format(totalFavorites)}
                </span>
              </div>
            )}
          </div>
        </div>

        <p
          className="mt-2 line-clamp-2 text-ellipsis text-sm/5 text-neutral-700 dark:text-neutral-200"
          aria-label={short_description}
        >
          {short_description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          {avgRating > 0 && (
            <RatingPrecision
              average={avgRating}
              totalReviews={totalReviewsSum}
              reviewsCount={reviewsCount}
            />
          )}
        </div>
      </div>
    </div>
  );
}
