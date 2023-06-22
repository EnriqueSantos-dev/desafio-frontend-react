import { Header } from "@/components/header";
import { Providers } from "@/components/providers";
import { socialLinks } from "@/constants/links";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { seoConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  ...seoConfig,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-neutral-50 dark:bg-neutral-900`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
