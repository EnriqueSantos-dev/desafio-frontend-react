import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="grid h-screen min-h-screen grid-cols-1 bg-neutral-50 p-8 dark:bg-neutral-900 lg:grid-cols-2">
      {children}
    </main>
  );
}
