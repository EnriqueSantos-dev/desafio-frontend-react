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

type SearchParamsKeys = "search" | "genre";

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
  const { data: games, isLoading } = useGetGames();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const genres = new Set(games?.map((game) => game.genre));
  const isDisableSelectGenre = !games || isLoading || !genres;
  const isDisableSearchInput = !games || isLoading;
  const defaultSearchValue = searchParams.get("search") ?? "";
  const defaultGenreValue = searchParams.get("genre") ?? "";

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
  };

  const handleChangeValue = (key: SearchParamsKeys, value: string) => {
    const searchParams = updateSearchParams(key, value);
    router.push(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <div className="container border-b border-neutral-200 py-3 dark:border-neutral-800">
      <form
        className="flex flex-col items-end gap-3 md:flex-row lg:w-2/4"
        onSubmit={handleSubmit}
      >
        <fieldset className="flex w-full flex-col gap-2">
          <label
            htmlFor="search"
            className="text-neutra-900 inline-block cursor-pointer font-medium dark:text-neutral-100"
          >
            Search
          </label>
          <SearchGamesInput
            id="search"
            onValueChange={(value) => handleChangeValue("search", value)}
            defaultValue={defaultSearchValue}
            disabled={isDisableSearchInput}
          />
        </fieldset>

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
      </form>
    </div>
  );
}
