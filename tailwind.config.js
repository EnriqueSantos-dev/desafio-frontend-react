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
      boxShadow: {
        innerShadowDark: "inset 0px 0px 0px 1px rgb(39,39,42)",
        innerShadowLight: "inset 0px 0px 0px 1px rgb(229, 229, 229)",
      },
    },
  },
  plugins: [],
};
