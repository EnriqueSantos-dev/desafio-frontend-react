import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Auth",
  description: "Login or Register to access your account",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="grid min-h-screen grid-cols-1 bg-neutral-50 p-8 dark:bg-neutral-900 lg:grid-cols-2">
      {children}
    </main>
  );
}
