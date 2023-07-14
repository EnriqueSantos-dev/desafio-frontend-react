import React, { useState } from "react";
import { Heart } from "lucide-react";

import { Button } from "@/components/shared/ui/button";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type ButtonFavoritesProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  defaultFavoritesValue: string;
  handleSelectFavorites: (value: string) => void;
};

export function ButtonFavorites({
  defaultFavoritesValue,
  handleSelectFavorites,
  ...props
}: ButtonFavoritesProps) {
  const router = useRouter();
  const [favorites, setFavorites] = useState(
    defaultFavoritesValue === "favorites"
  );

  const handleClick = (value: string) => {
    setFavorites(!favorites);
    handleSelectFavorites(favorites ? "" : value);
    router.refresh();
  };

  return (
    <Button
      type="button"
      variant="blue"
      size="md"
      {...props}
      onClick={() => handleClick("favorites")}
      className={cn(
        favorites
          ? "bg-blue-600 hover:bg-blue-700"
          : "bg-blue-500 hover:bg-blue-600"
      )}
    >
      <Heart
        size={20}
        className={cn("transition-colors", favorites ? "fill-white" : "")}
      />
      <span className="hidden md:inline-block">Favorites</span>
    </Button>
  );
}
