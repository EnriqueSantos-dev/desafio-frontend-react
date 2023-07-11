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

type SearchParamsKeys = "search" | "genre" | "favorites" | "sort";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const genres = new Set(games?.map((game) => game.genre));
  const isDisableSelectGenre = !games || isLoading || isError || !genres;
  const isDisableSearchInput = !games || isLoading || isError;
  const defaultSearchValue = searchParams.get("search") ?? "";
  const defaultGenreValue = searchParams.get("genre") ?? "";
  const defaultFavoritesValue = searchParams.get("favorites") ?? "";
  const defaultSortValue = searchParams.get("ratings") ?? "";

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
  };

  const handleChangeValue = (key: SearchParamsKeys, value: string) => {
    const searchParams = updateSearchParams(key, value);
    router.replace(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <div className="container border-b border-neutral-200 py-3 dark:border-neutral-800">
      <form
        className="grid grid-flow-row gap-y-4 lg:grid-cols-[60%_1fr] lg:grid-rows-2 lg:items-end lg:gap-y-0 xl:grid-cols-[40%_1fr_1fr] xl:grid-rows-none"
        onSubmit={handleSubmit}
      >
        <fieldset
          className={cn(
            "flex w-full flex-col gap-2 md:justify-self-end",
            isLoading && "col-span-full"
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
            "h-fit md:justify-self-end xl:justify-self-start xl:pl-6",
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

        <div className="flex items-center justify-end gap-3 lg:col-span-full lg:row-span-2 lg:h-full lg:justify-self-auto xl:col-auto xl:row-auto xl:h-auto xl:justify-self-end xl:pb-1">
          <MustAvailable
            defaultMustAvailableValue={defaultSortValue}
            handleToggleMustAvailable={(value) =>
              handleChangeValue("sort", value)
            }
            disabled={isError || isLoading}
          />
          <ButtonFavorites
            handleSelectFavorites={(value) =>
              handleChangeValue("favorites", value)
            }
            defaultFavoritesValue={defaultFavoritesValue}
            disabled={isError || isLoading}
          />

          <ClearFiltersButton />
        </div>
      </form>
    </div>
  );
}
