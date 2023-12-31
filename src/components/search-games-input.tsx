import { useRef, useEffect, useState } from "react";

import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

import { TextField } from "@/components/shared/ui/text-input";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
} from "@/components/shared/ui/tooltip";

type SearchGamesInputProps = {
  id?: string;
  disabled?: boolean;
  defaultValue?: string;
  onValueChange: (value: string) => void;
  refObject?: React.RefObject<HTMLInputElement>;
};

export function SearchGamesInput({
  id,
  defaultValue,
  onValueChange,
  disabled,
  refObject,
}: SearchGamesInputProps) {
  const [searchValue, setSearchValue] = useState(defaultValue ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocusInput = () => refObject?.current?.focus();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && inputRef?.current) {
        e.preventDefault();
        inputRef.current.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchValue === defaultValue) return;
      onValueChange(searchValue);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [defaultValue, onValueChange, searchValue]);

  return (
    <TextField.Root>
      <TextField.Addon onClick={handleFocusInput}>
        <Search size={20} />
      </TextField.Addon>
      <TextField.Field
        id={id}
        type="search"
        placeholder="Search your favorite game..."
        className="peer appearance-none"
        ref={inputRef}
        value={searchValue}
        onChange={(ev) =>
          !disabled && setSearchValue(ev.target.value.toLowerCase())
        }
        disabled={disabled}
      />

      <TextField.Addon asChild>
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-gray-200 px-2 text-lg text-neutral-300 transition-colors peer-focus-visible:hidden dark:border-neutral-800 dark:text-neutral-500 dark:hover:text-neutral-400"
              disabled={disabled}
            >
              /
            </TooltipTrigger>
            <TooltipContent className={cn({ hidden: disabled })}>
              <p>Press Slash to start searching</p>
              <TooltipArrow />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TextField.Addon>
    </TextField.Root>
  );
}
