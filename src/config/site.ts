import { socialLinks } from "@/constants/links";
import { Metadata } from "next";

export const seoConfig: Metadata = {
  metadataBase: new URL("https://desafio-frontend-react.vercel.app"),
  title: {
    default: "Pick Your Game",
    template: "%s | Pick Your Game",
  },
  description:
    "Pick your favorite game, filter results, see details and more...",
  authors: [
    {
      name: "Enrique Santos",
      url: socialLinks.github,
    },
  ],
  keywords: [
    "react",
    "nextjs",
    "typescript",
    "tailwindcss",
    "radix-ui",
    "seo",
    "web",
    "frontend",
    "challenge",
  ],
  openGraph: {
    type: "website",
    url: "https://desafio-frontend-react.vercel.app",
    title: "Pick Your Game - Enrique Santos",
    siteName: "Pick Your Game",
    description:
      "Pick your favorite game, filter results, see details and more...",
    images: [
      {
        url: "https://desafio-frontend-react.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "Pick Your Game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@Enrique_S_D_O",
    site: "@Enrique_S_D_O",
    title: "Pick Your Game - Enrique Santos",
    description:
      "Pick your favorite game, filter results, see details and more...",
    images: [
      {
        url: "https://desafio-frontend-react.vercel.app/og.png?v1",
        alt: "Pick Your Game",
      },
    ],
  },
};
