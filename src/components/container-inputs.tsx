"use client";

import { FormEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ChevronDown } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shared/ui/select";
import { SearchGamesInput } from "@/components/search-games-input";

import { useGetGames } from "@/hooks/useGetGames";
import { LabelText } from "@/components/shared/label-text";
import { ButtonFavorites } from "@/components/button-favorites";
import { MustAvailable } from "@/components/must-available";
import { ClearFiltersButton } from "@/components/clear-filters-button";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/contexts/auth-context";

type SearchParamsKeys = "search" | "genre" | "filter" | "sort";

const updateSearchParams = (key: SearchParamsKeys, value: string) => {
  const newSearchParams = new URLSearchParams(window.location.search);

  if (newSearchParams.has(key) && value === "") {
    newSearchParams.delete(key);
    return newSearchParams.toString();
  }

  newSearchParams.set(key, value);
  return newSearchParams.toString();
};

export function ContainerInputs() {
  const { data: games, isLoading, isError } = useGetGames([]);
  const { hasSession } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const genres = new Set(games?.map((game) => game.genre));
  const isDisableSelectGenre = !games || isLoading || isError || !genres;
  const isDisableSearchInput = !games || isLoading || isError;
  const defaultSearchValue = searchParams.get("search") ?? "";
  const defaultGenreValue = searchParams.get("genre") ?? "";
  const defaultFavoritesValue = searchParams.get("filter") ?? "";

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
  };

  const handleChangeValue = (key: SearchParamsKeys, value: string) => {
    const searchParams = updateSearchParams(key, value);
    router.replace(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <div className="container fixed inset-x-0 top-16 z-10 border-b border-neutral-200 bg-neutral-50 py-3 pt-12 dark:border-neutral-800 dark:bg-neutral-900">
      <form
        className="flex flex-col gap-3 xl:flex-1 xl:flex-row xl:items-end"
        onSubmit={handleSubmit}
      >
        <fieldset
          className={cn(
            "flex flex-col gap-2 md:justify-self-end xl:flex-1 xl:max-w-2xl"
          )}
        >
          <LabelText.Root>
            <LabelText.Label htmlFor="search">Search</LabelText.Label>
          </LabelText.Root>
          <SearchGamesInput
            id="search"
            onValueChange={(value) => handleChangeValue("search", value)}
            defaultValue={defaultSearchValue}
            disabled={isDisableSearchInput}
          />
        </fieldset>

        <div
          className={cn(
            "md:flex-1 xl:flex-grow-0 justify-end flex",
            isLoading && "hidden"
          )}
        >
          {genres && genres.size > 0 && (
            <Select
              defaultValue={defaultGenreValue}
              onValueChange={(value) => handleChangeValue("genre", value)}
            >
              <SelectTrigger
                className="group w-full md:w-72"
                disabled={isDisableSelectGenre}
              >
                <SelectValue placeholder="Select a genre" />

                <SelectIcon asChild>
                  <ChevronDown
                    size={16}
                    className="transition-transform group-data-[state=open]:rotate-180"
                  />
                </SelectIcon>
              </SelectTrigger>

              <SelectContent className="max-h-72 overflow-auto">
                <SelectItem value="">All Genres</SelectItem>
                {Array.from(genres).map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2 xl:pb-1">
          <MustAvailable disabled={isError || isLoading || !hasSession} />
          <ButtonFavorites
            handleSelectFavorites={(value) =>
              handleChangeValue("filter", value)
            }
            defaultFavoritesValue={defaultFavoritesValue}
            disabled={isError || isLoading || !hasSession}
          />
          <ClearFiltersButton />
        </div>
      </form>
    </div>
  );
}
