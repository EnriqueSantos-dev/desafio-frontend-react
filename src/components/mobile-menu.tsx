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
    const addOverflowHiddenInWindow = () => {
      const html = document.documentElement;
      if (isMenuOpen) {
        html.classList.add("overflow-hidden");
        html.setAttribute("data-menu-open", "true");
      } else {
        html.classList?.remove("overflow-hidden");
        html.setAttribute("data-menu-open", "false");
      }
    };

    addOverflowHiddenInWindow();

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
            "w-full overflow-y-auto fixed z-10 bg-neutral-50 px-4 py-6 dark:bg-neutral-900 transition-all lg:hidden flex flex-col",
            {
              "visible opacity-100 inset-0 top-16": isMenuOpen,
              "invisible opacity-0 inset-auto": !isMenuOpen,
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
              <div className="flex w-full flex-col justify-center gap-2">
                <Link
                  href="/auth"
                  className={buttonsVariants({
                    variant: "green",
                    className: "w-full",
                    size: "md",
                  })}
                >
                  Sign Up
                </Link>

                <Link
                  href="/auth"
                  className={buttonsVariants({
                    variant: "blue",
                    className: "w-full",
                    size: "md",
                  })}
                >
                  Login
                </Link>
              </div>
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
                    <span>Github</span>
                    <Github size={18} />
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
