"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Fragment, ReactNode } from "react";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <Toaster position="top-right" />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Fragment>
  );
}
