import { ReactNode } from "react";

import { AlertExpiredSession } from "@/components/alert-expired-session";
import { Header } from "@/components/header";
import { AlertUnauthorizedUser } from "@/components/shared/alert-unathorized-user";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AlertExpiredSession />
      <AlertUnauthorizedUser />
      <Header />
      {children}
    </>
  );
}
