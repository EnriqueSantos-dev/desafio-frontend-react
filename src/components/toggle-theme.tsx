"use client";

import {
  TooltipArrow,
  TooltipContent,
  Tooltip as TooltipPrimitive,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shared/ui/tooltip";
import { cn } from "@/lib/utils";
import * as Switch from "@radix-ui/react-switch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ToggleTheme() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <TooltipProvider>
      <TooltipPrimitive>
        <TooltipTrigger asChild>
          <Switch.Root
            aria-label="Switch between dark and light mode"
            className={cn(
              "relative flex h-6 w-12 overflow-hidden items-start ring-neutral-300 dark:ring-neutral-800 ring-offset-neutral-50 dark:focus-visible:ring-offset-neutral-950 dark:border-neutral-800 border dark:hover:bg-neutral-800 dark:hover:border-neutral-700 hover:bg-neutral-100 transition-colors dark:bg-neutral-950/50 focus-state"
            )}
            style={{ borderRadius: 9999 }}
            onCheckedChange={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
          >
            <Switch.Thumb
              asChild
              className={cn(
                "transition-transform flex h-4/5 p-0.5 w-5 items-center justify-center rounded-full ml-[3px] absolute top-1/2 -translate-y-1/2",
                {
                  "translate-x-full bg-neutral-700 text-neutral-100": isDark,
                  "bg-neutral-200 text-neutral-500": !isDark,
                }
              )}
            >
              {!isDark ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </Switch.Thumb>
          </Switch.Root>
        </TooltipTrigger>

        <TooltipContent>
          <p>Toggle theme</p>

          <TooltipArrow />
        </TooltipContent>
      </TooltipPrimitive>
    </TooltipProvider>
  );
}
