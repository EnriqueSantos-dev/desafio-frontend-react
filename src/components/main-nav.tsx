import Link from "next/link";

import { Gamepad2, GithubIcon } from "lucide-react";

import { AvatarProfile } from "@/components/avatar-popover";
import { buttonsVariants } from "@/components/shared/ui/button";
import ToggleTheme from "@/components/toggle-theme";

import { socialLinks } from "@/constants/links";

import { getAuthSession } from "@/services/users/get-auth-session";
import Image from "next/image";

export async function MainNav() {
  const session = await getAuthSession();

  return (
    <nav className="container flex h-16 items-center justify-between">
      <Link
        href="/"
        className="flex items-center space-x-3 text-xl font-bold text-neutral-900 hover:underline dark:text-neutral-100"
      >
        <span className="hidden md:inline-block">Pick Your Game</span>
        <Image
          src="/game-card-svgrepo-com.svg"
          alt="game controller"
          width={40}
          height={40}
          className="fill-black"
        />
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

        {!session ? (
          <div className="space-x-2">
            <Link
              href="/auth"
              className={buttonsVariants({
                variant: "green",
                className: "px-6 ml-4",
                size: "md",
              })}
            >
              Sign Up
            </Link>

            <Link
              href="/auth"
              className={buttonsVariants({
                variant: "blue",
                className: "px-6 ml-4",
                size: "md",
              })}
            >
              Login
            </Link>
          </div>
        ) : (
          <AvatarProfile sessionData={session} />
        )}
      </div>
    </nav>
  );
}