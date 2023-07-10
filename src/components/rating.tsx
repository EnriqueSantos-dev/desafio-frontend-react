"use client";

import React, { useEffect, useState } from "react";

import { Star } from "lucide-react";

import { useRatingGame } from "@/hooks/useRatingGame";
import { useToast } from "@/hooks/useToast";

import { cn } from "@/lib/utils";
import { useAuthContext } from "@/contexts/auth-context";
import { useAlertUnauthorizedStore } from "@/hooks/useAlertUnauthorizedStore";
import { ALERT_UNAUTHORIZED_USER_MESSAGES } from "@/constants/alert-unauthorized-messages";

type RatingProps = {
  gameId: number;
  initialRating: number;
};

const MAX_RATING = 5;

export function Rating({ gameId, initialRating }: RatingProps) {
  const [rating, setRating] = useState(initialRating);
  const { hasSession } = useAuthContext();
  const { success, error } = useToast();
  const mutation = useRatingGame();
  const setIsAlertUnauthorized = useAlertUnauthorizedStore(
    (state) => state.setIsAlertUnauthorized
  );
  const setDescriptionAlertUnauthorized = useAlertUnauthorizedStore(
    (state) => state.setDescriptionAlertMessage
  );

  const handleRating = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasSession) {
      setIsAlertUnauthorized(true);
      setDescriptionAlertUnauthorized(
        ALERT_UNAUTHORIZED_USER_MESSAGES.ratingGame
      );
      return;
    }
    const parsedRating = parseInt(e.target.value);
    const ratingToSet = rating === 1 && parsedRating === 1 ? 0 : parsedRating;

    if (parsedRating !== 1 && ratingToSet === rating) return;

    setRating(ratingToSet);
    mutation.mutate({ gameId, rating: ratingToSet });
  };

  useEffect(() => {
    if (mutation.isSuccess && mutation.data) {
      success(mutation.data.message);
    }
  }, [mutation.isSuccess, mutation.data, success]);

  useEffect(() => {
    if (mutation.error) {
      error(mutation.error.message);
    }
  }, [mutation.error, error]);

  return (
    <div className="container-rating mb-2 space-x-2">
      {Array.from({ length: MAX_RATING }, (_, i) => {
        return (
          <div key={i} className="inline">
            <label
              className="button-rating group inline cursor-pointer py-1"
              tabIndex={0}
            >
              <input
                key={i}
                type="checkbox"
                name="rating"
                value={i + 1}
                className="peer"
                hidden
                checked={rating >= i + 1}
                onChange={handleRating}
              />
              <Star
                size={24}
                className={cn(
                  "star-rating inline transition-colors stroke-neutral-500 fill-neutral-500",
                  {
                    "fill-yellow-400 stroke-yellow-400": rating >= i + 1,
                  }
                )}
              />
            </label>
          </div>
        );
      })}
    </div>
  );
}
