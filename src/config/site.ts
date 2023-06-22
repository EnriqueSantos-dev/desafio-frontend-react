import { socialLinks } from "@/constants/links";
import { Metadata } from "next";

export const seoConfig: Metadata = {
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
    url: "https://desafio-frontend-react.vercel.app/",
    title: "Challenge Frontend React - Enrique Santos",
    description:
      "Pick your favorite movie, filter results and see details and more...",
    images: [
      {
        url: "https://desafio-frontend-react.vercel.app/facebook-img.png",
        alt: "Challenge Frontend React - Enrique Santos - Facebook Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://desafio-frontend-react.vercel.app",
    creator: "@Enrique_S_D_O",
    creatorId: "https://twitter.com/Enrique_S_D_O",
    siteId: "https://twitter.com/Enrique_S_D_O",
    title: "Challenge Frontend React - Enrique Santos",
    description:
      "Pick your favorite movie, filter results and see details and more...",
    images: [
      {
        url: "https://desafio-frontend-react.vercel.app/images/twitter-image.png",
        alt: "Challenge Frontend React - Enrique Santos - Twitter Image",
      },
    ],
  },
  robots: "index, follow",
};
