import Link from "next/link";

import { GithubIcon } from "lucide-react";

import { getAuthSession } from "@/services/users/get-auth-session";

import { socialLinks } from "@/constants/links";

import ToggleTheme from "@/components/toggle-theme";
import { buttonsVariants } from "@/components/shared/ui/button";

import { ContainerInputs } from "./container-inputs";

export async function Header() {
  const session = await getAuthSession();

  return (
    <header className="fixed top-0 z-50 flex h-auto w-full flex-col gap-12 bg-neutral-50 dark:bg-neutral-900">
      <div className="border-b border-neutral-200 dark:border-neutral-800">
        <nav className="container flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold text-neutral-950 dark:text-neutral-100"
          >
            Pick Your Game
          </Link>
          <div className="flex items-center gap-2">
            <ToggleTheme />

            <Link
              href={socialLinks.github}
              target="_blank"
              className="focus-state rounded-lg p-2 text-neutral-900 shadow-innerShadowLight ring-amber-500 ring-offset-neutral-300 transition-colors hover:bg-slate-100 dark:bg-neutral-950 dark:text-neutral-100 dark:shadow-innerShadowDark dark:ring-offset-neutral-950 dark:hover:bg-neutral-900"
            >
              <GithubIcon size={20} />
            </Link>

            {!session?.uid && (
              <Link
                href="/auth/login"
                className={buttonsVariants({
                  variant: "blue",
                  className: "px-6 ml-4",
                  size: "md",
                })}
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
      <ContainerInputs />
    </header>
  );
}
