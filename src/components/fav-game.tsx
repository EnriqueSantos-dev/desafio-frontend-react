import { useEffect, useRef, useState } from "react";

import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

import { useAuthContext } from "@/contexts/auth-context";
import { ALERT_UNAUTHORIZED_USER_MESSAGES } from "@/constants/alert-unauthorized-messages";

import { useAlertUnauthorizedStore } from "@/hooks/useAlertUnauthorizedStore";
import { useFavoriteGame } from "@/hooks/useFavGame";
import { useToast } from "@/hooks/useToast";

type FavGameProps = {
  isFav: boolean;
  gameId: number;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function FavGame({ isFav, gameId, className, ...props }: FavGameProps) {
  const [isFavGame, setIsFavGame] = useState(isFav);
  const heartRef = useRef<HTMLSpanElement>(null);
  const { hasSession } = useAuthContext();
  const { setIsAlertUnauthorized, setDescriptionAlertMessage } =
    useAlertUnauthorizedStore();
  const { mutate, error: mutationError, isSuccess, data } = useFavoriteGame();
  const { error, success } = useToast();

  const onHeartClick = () => {
    if (!hasSession) {
      setIsAlertUnauthorized(true);
      setDescriptionAlertMessage(ALERT_UNAUTHORIZED_USER_MESSAGES.favGame);
      return;
    }

    mutate({ gameId, isFav: !isFavGame });

    setIsFavGame((fav) => !fav);
    if (isFavGame) return;

    if (heartRef.current) {
      heartRef.current.classList.remove("hidden");
      heartRef.current.classList.add("animate-hearTranslateUp", "inline-block");
    }

    setTimeout(() => {
      if (heartRef.current) {
        heartRef.current.classList.remove("animate-hearTranslateUp");
        heartRef.current.classList.add("hidden");
      }
    }, 1000);
  };

  useEffect(() => {
    if (isSuccess) {
      success(data.message);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data]);

  useEffect(() => {
    if (mutationError?.message) {
      error(mutationError.message);
      setIsFavGame((fav) => !fav);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutationError, setIsFavGame]);

  return (
    <button
      {...props}
      className={cn(
        "group relative shrink-0 p-1 text-xl",
        "before:absolute before:left-1/2 before:top-1/2 before:-z-10 before:h-[140%] before:w-[140%] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:transition-colors",
        "after:absolute after:left-1/2 after:top-1/2 after:-z-10 after:h-[110%] after:w-[110%] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:transition-colors",
        "hover:before:bg-red-300 hover:after:bg-red-200 dark:hover:before:bg-red-400 dark:hover:after:bg-red-300",
        className
      )}
      onClick={onHeartClick}
    >
      <span
        ref={heartRef}
        className="absolute left-1/2 hidden -translate-x-1/2"
      >
        <Heart size={32} className="fill-red-600/80 stroke-red-600" />
      </span>

      {/* animate-heartbeat is custom animation */}
      <Heart
        className={cn(
          "transition-colors group-hover:fill-red-600 group-hover:animate-heartbeat z-10 group-hover:stroke-red-600 delay-0",
          {
            "fill-red-600 stroke-red-600": isFavGame,
            "stroke-neutral-700 fill-neutral-700": !isFavGame,
          }
        )}
      />
    </button>
  );
}
