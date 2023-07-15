import { ReactNode } from "react";

import { Header } from "@/components/header";
import { Alerts } from "@/components/shared/alerts";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Alerts />
      <Header />
      {children}
    </>
  );
}
