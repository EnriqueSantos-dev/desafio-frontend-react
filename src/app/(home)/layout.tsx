import { AlertExpiredSession } from "@/components/alert-expired-session";
import { Header } from "@/components/header";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AlertExpiredSession />
      <Header />
      {children}
    </>
  );
}
