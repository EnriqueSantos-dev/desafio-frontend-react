import "./globals.css";

import { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { Providers } from "@/components/providers";

import { seoConfig } from "@/config/site";

import { GameUserDetails } from "@/types";
import { SESSION_COOKIE_NAME } from "@/constants/session-cookie";

import { getAuthSession } from "@/services/users/get-auth-session";
import { getFavAndRatingsGames } from "@/services/games/get-fav-and-ratings-games";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  ...seoConfig,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieSession = cookies().get(SESSION_COOKIE_NAME);
  const session = await getAuthSession();

  let userFavoritesGames: GameUserDetails[] = [];

  if (session) {
    userFavoritesGames = await getFavAndRatingsGames();
  }

  return (
    <html lang="en">
      <body className={`${inter.className} bg-neutral-50 dark:bg-neutral-900`}>
        <Providers
          hasCookieSession={!!cookieSession?.value}
          sessionData={session}
          userFavoritesGames={userFavoritesGames}
        >
          {children}
        </Providers>
        <div id="portal" />
      </body>
    </html>
  );
}
