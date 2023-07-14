import Link from "next/link";

import { GithubIcon } from "lucide-react";

import { getAuthSession } from "@/services/users/get-auth-session";

import { socialLinks } from "@/constants/links";
import { MainNav } from "@/components/main-nav";

export function Header() {
  return (
    <header className="fixed top-0 z-50 flex h-auto w-full flex-col gap-8 bg-neutral-50 dark:bg-neutral-900">
      <div className="border-b border-neutral-200 dark:border-neutral-800">
        <MainNav />
      </div>
    </header>
  );
}
