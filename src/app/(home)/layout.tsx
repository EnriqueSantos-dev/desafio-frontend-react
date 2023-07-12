import { ReactNode } from "react";

import { Header } from "@/components/header";
import { ContainerInputs } from "@/components/container-inputs";
import { Alerts } from "@/components/shared/alerts";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Alerts />
      <Header />
      <ContainerInputs />
      {children}
    </>
  );
}
