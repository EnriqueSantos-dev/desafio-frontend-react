"use client";

import ToggleTheme from "@/components/toggle-theme";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shared/ui/tooltip";
import { cn } from "@/lib/utils";
import { AlignRight, Github, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { socialLinks } from "@/constants/links";
import { buttonsVariants } from "@/components/shared/ui/button";

type MobileMenuProps = {
  hasSession: boolean;
};

export function MobileMenu({ hasSession }: MobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [isMenuOpen]);

  if (!isMounted) return null;

  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger
            aria-label="Toggle menu"
            className="z-20 cursor-pointer text-neutral-900 dark:text-neutral-100 lg:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <AlignRight />}
          </TooltipTrigger>

          <TooltipContent>
            <p>Toggle menu</p>
            <TooltipArrow />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {createPortal(
        <div
          className={cn(
            "w-full overflow-hidden fixed z-10 bg-neutral-50 px-4 py-6 dark:bg-neutral-900 transition-all lg:hidden flex flex-col shadow-md rounded-b-lg",
            {
              "visible opacity-100 max-h-[50dvh] h-fit top-16": isMenuOpen,
              "invisible opacity-0 inset-aut max-h-0 top-0": !isMenuOpen,
            }
          )}
        >
          <Link
            href="/"
            className="mx-auto mb-6 block text-center text-lg font-semibold"
          >
            Pick Your Game
          </Link>
          <nav className="mx-auto flex w-full max-w-xs flex-1 flex-col justify-end gap-4 md:max-w-sm">
            {!hasSession && (
              <Link
                href="/auth"
                className={buttonsVariants({
                  variant: "blue",
                  className: "w-full",
                })}
              >
                Authenticate
              </Link>
            )}

            <div className="flex flex-1 flex-col justify-end gap-4">
              <ul className="space-y-4 text-sm text-neutral-900 dark:text-neutral-100">
                <li>
                  <Link
                    href={socialLinks.github}
                    className={buttonsVariants({
                      variant: "neutral",
                      className: "w-full",
                    })}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 fill-white dark:fill-black"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>

                    <span>Github</span>
                  </Link>
                </li>
              </ul>

              <div className="flex items-center justify-between rounded-md border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-800 dark:bg-neutral-950">
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-300">
                  Appearance
                </span>

                <ToggleTheme />
              </div>
            </div>
          </nav>
        </div>,
        document.getElementById("portal") as HTMLElement
      )}
    </>
  );
}
