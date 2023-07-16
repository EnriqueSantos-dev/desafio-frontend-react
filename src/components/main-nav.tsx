import Link from "next/link";

import { AvatarProfile } from "@/components/avatar-popover";
import { buttonsVariants } from "@/components/shared/ui/button";
import ToggleTheme from "@/components/toggle-theme";

import { socialLinks } from "@/constants/links";

import { getAuthSession } from "@/services/users/get-auth-session";
import Image from "next/image";
import { MobileMenu } from "@/components/mobile-menu";

export async function MainNav() {
  const session = await getAuthSession();

  return (
    <nav className="container flex h-16 items-center justify-between">
      <div className="flex items-center space-x-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-xl font-bold text-neutral-900 hover:underline dark:text-neutral-100"
        >
          <Image
            src="/game-card.svg"
            alt="game controller"
            width={40}
            height={40}
          />
          <span className="hidden lg:inline-block">Pick Your Game</span>
        </Link>

        <Link
          href="/community"
          className="font-medium text-neutral-700 transition-colors hover:text-neutral-900 hover:underline dark:text-neutral-200 dark:hover:text-neutral-100"
        >
          Community
        </Link>
      </div>
      <div className="flex items-center">
        <div className="hidden items-center space-x-3 lg:flex">
          <ToggleTheme />

          <Link
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="h-8 w-8 p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </Link>
        </div>

        <MobileMenu hasSession={!!session} />

        {!session && (
          <Link
            href="/auth"
            className={buttonsVariants({
              variant: "blue",
              className: "px-6 ml-4 hidden lg:flex",
              size: "md",
            })}
          >
            Authenticate
          </Link>
        )}

        {session && (
          <div className="ml-4 flex items-center justify-center">
            <AvatarProfile sessionData={session} />
          </div>
        )}
      </div>
    </nav>
  );
}
