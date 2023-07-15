import { Star } from "lucide-react";

type RatingPrecisionProps = {
  average: number;
  totalReviews: number;
  reviewsCount: number;
};

export function RatingPrecision({
  average,
  totalReviews,
  reviewsCount,
}: RatingPrecisionProps) {
  return (
    <div className="flex items-center text-neutral-900 dark:text-neutral-100">
      <Star size={24} className="mb-px fill-yellow-500 stroke-yellow-500" />
      <p className="ml-2 text-sm font-bold text-neutral-900 dark:text-neutral-100">
        {average.toFixed(2)}
      </p>

      <span className="mx-1.5 h-1 w-1 rounded-full bg-neutral-700 dark:bg-neutral-800"></span>
      <span className="text-sm font-medium">
        {new Intl.NumberFormat("en-US", {
          compactDisplay: "short",
        }).format(totalReviews)}{" "}
        out of {reviewsCount}
      </span>
    </div>
  );
}