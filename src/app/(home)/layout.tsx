import { ReactNode } from "react";

import { AlertExpiredSession } from "@/components/alert-expired-session";
import { Header } from "@/components/header";
import { AlertUnauthorizedUser } from "@/components/shared/alert-unathorized-user";
import { ContainerInputs } from "@/components/container-inputs";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AlertExpiredSession />
      <AlertUnauthorizedUser />
      <Header />
      <ContainerInputs />
      {children}
    </>
  );
}
