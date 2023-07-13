import { socialLinks } from "@/constants/links";
import { Metadata } from "next";

export const seoConfig: Metadata = {
  metadataBase: new URL("https://desafio-frontend-react.vercel.app"),
  title: "Challenge Frontend React - Enrique Santos",
  description:
    "Pick your favorite movie, filter results and see details and more...",
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
    title: "Challenge Frontend React - Enrique Santos",
    siteName: "Pick Your Game",
    description:
      "Pick your favorite movie, filter results and see details and more...",
    images: [
      {
        url: "https://desafio-frontend-react.vercel.app/facebook-img.png",
        width: 1200,
        height: 630,
        alt: "Pick Your Game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@Enrique_S_D_O",
    title: "Challenge Frontend React - Enrique Santos",
    description:
      "Pick your favorite movie, filter results and see details and more...",
    images: [
      {
        url: "https://desafio-frontend-react.vercel.app/twitter-image.png",
        alt: "Pick Your Game",
      },
    ],
  },
  robots: "index, follow",
};
