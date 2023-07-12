"use client";

import { ReactNode } from "react";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import { AuthContextProps, AuthContextProvider } from "@/contexts/auth-context";
import { ThemeProvider } from "next-themes";
import { THEME_KEY } from "@/constants/theme-key";

const queryClient = new QueryClient();

export function Providers({
  children,
  ...props
}: { children: ReactNode } & Omit<AuthContextProps, "hasSession">) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        defaultTheme="light"
        attribute="class"
        storageKey={THEME_KEY}
        disableTransitionOnChange={false}
      >
        <ReactQueryDevtools />
        <AuthContextProvider values={{ ...props }}>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              className:
                "bg-neutral-200 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100",
            }}
          />
          {children}
        </AuthContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
