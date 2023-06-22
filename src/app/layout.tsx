import { Header } from "@/components/header";
import { Providers } from "@/components/providers";
import { socialLinks } from "@/constants/links";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Teste Frontend - Vaga React",
  description:
    "Teste para vaga de estágio em desenvolvimento frontend com ReactJS/NextJS.",
  authors: {
    name: "Enrique Santos de Oliveira",
    url: socialLinks.github,
  },
  robots: "index, follow",
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
