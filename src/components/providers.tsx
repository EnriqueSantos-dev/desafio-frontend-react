"use client";

import { AuthContextProvider } from "@/contexts/auth-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export function Providers({
  children,
  hasSession,
}: {
  hasSession: boolean;
  children: ReactNode;
}) {
  return (
    <AuthContextProvider hasSession={hasSession}>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          className:
            "bg-neutral-200 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100",
        }}
      />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthContextProvider>
  );
}
