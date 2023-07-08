import "./globals.css";

import { Metadata } from "next";
import { Inter } from "next/font/google";

import { Header } from "@/components/header";
import { Providers } from "@/components/providers";

import { seoConfig } from "@/config/site";

import { getAuthSession } from "@/services/users/get-auth-session";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  ...seoConfig,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  return (
    <html lang="en">
      <body className={`${inter.className} bg-neutral-50 dark:bg-neutral-900`}>
        <Providers hasSession={!!session}>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
