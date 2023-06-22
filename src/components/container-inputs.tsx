"use client";

import {
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shared/ui/select";
import { useGetGames } from "@/hooks/useGetGames";
import { ListFilter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useRef } from "react";
import { TextInput } from "./shared/ui/text-input";

type SearchParamsKeys = "search" | "genre";

const updateSearchParams = (key: SearchParamsKeys, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  if (searchParams.has(key) && value === "") {
    searchParams.delete(key);
    return searchParams.toString();
  }

  searchParams.set(key, value);
  return searchParams.toString();
};

export function ContainerInputs() {
  const { data: games, isLoading } = useGetGames();
  const inputRef = useRef<HTMLInputElement>(null);
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
      <form className="flex items-end gap-3 lg:w-2/4" onSubmit={handleSubmit}>
        <fieldset className="flex w-full flex-col gap-2">
          <label
            htmlFor="search"
            className="text-neutra-900 inline-block cursor-pointer font-medium dark:text-neutral-100"
          >
            Search
          </label>
          <TextInput
            id="search"
            type="search"
            placeholder="search your favorite game..."
            ref={inputRef}
            defaultValue={defaultSearchValue}
            onChange={(ev) =>
              handleChangeValue("search", ev.target.value.toLowerCase())
            }
            disabled={isDisableSearchInput}
          />
        </fieldset>

        {genres && genres.size > 0 && (
          <Select
            defaultValue={defaultGenreValue}
            onValueChange={(value) =>
              handleChangeValue("genre", value.toLowerCase())
            }
          >
            <SelectTrigger className="w-52" disabled={isDisableSelectGenre}>
              <SelectValue placeholder="Select a genre" />

              <SelectIcon asChild>
                <ListFilter size={16} />
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
