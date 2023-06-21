import { THEME_KEY } from "@/constants/theme-key";
import { setItemInLocalStorage } from "@/utils/local-storage";
import { useCallback, useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function useTheme() {
  const [theme, setTheme] = useState<Theme | null>(null);

  const toggleTheme = useCallback(() => {
    const documentElement = window.document.documentElement;
    const currentThemeInDocumentIsDark =
      documentElement.classList.contains("dark");
    const currentThemeInDocumentIsLight =
      documentElement.classList.contains("light");

    if (!currentThemeInDocumentIsDark && !currentThemeInDocumentIsLight) {
      documentElement.classList.add("dark");
      setTheme("dark");
    }

    if (currentThemeInDocumentIsDark) {
      documentElement.classList.remove("dark");
      documentElement.classList.add("light");
    }

    if (currentThemeInDocumentIsLight) {
      documentElement.classList.remove("light");
      documentElement.classList.add("dark");
    }

    setTheme((prev) => {
      const currentThemToSet = prev === "light" || !prev ? "dark" : "light";
      setItemInLocalStorage(THEME_KEY, currentThemToSet);
      return currentThemToSet;
    });
  }, []);

  useEffect(() => {
    const documentElement = window.document.documentElement;

    // change theme if user has already set a theme, or if user has a system preference
    const themeFromLocalStorage = localStorage.getItem(THEME_KEY) as Theme;
    const systemPreferenceIsDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (themeFromLocalStorage) {
      setTheme(themeFromLocalStorage);
      documentElement.classList.add(themeFromLocalStorage);
      return;
    }

    if (systemPreferenceIsDark) {
      setTheme("dark");
      documentElement.classList.add("dark");
      return;
    }
  }, []);

  return [theme, toggleTheme] as const;
}
