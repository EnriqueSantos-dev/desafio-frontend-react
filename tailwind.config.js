/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
      },
    },
    extend: {
      dropShadow: { errorShadow: "0px 0px 80px rgba(245, 148, 11,0.5)" },
      boxShadow: {
        innerShadowDark: "inset 0px 0px 0px 1px rgb(28,28,28)",
        innerShadowLight: "inset 0px 0px 0px 1px rgb(229, 229, 229)",
      },
      animation: {
        heartbeat: "heartbeat 1s ease-in-out infinite",
        hearTranslateUp: "hearTranslateUp 1s ease-in-out",
        cardAppear: "cardAppear 300ms ease-in-out var(--delay) backwards",
      },
      keyframes: {
        cardAppear: {
          from: { transform: "scale(0.9)", opacity: 0 },
          to: { transform: "scale(1)", opacity: 1 },
        },
        hearTranslateUp: {
          to: { transform: "translateY(-100px)", opacity: 0 },
        },
        heartbeat: {
          "0%": {
            transform: { scale: "1" },
          },
          "25%": {
            transform: { scale: "0.8" },
          },
          "50%": {
            transform: "scale(1)",
          },
          "75%": {
            transform: "scale(0.8)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
