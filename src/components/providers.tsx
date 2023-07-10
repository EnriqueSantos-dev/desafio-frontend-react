"use client";

import { ReactNode } from "react";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import { AuthContextProvider } from "@/contexts/auth-context";

const queryClient = new QueryClient();

export function Providers({
  children,
  hasSession,
  hasCookieSession,
}: {
  hasSession: boolean;
  hasCookieSession: boolean;
  children: ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <AuthContextProvider values={{ hasCookieSession, hasSession }}>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
            className:
              "bg-neutral-200 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100",
          }}
        />
        {children}
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
