import { Header } from "@/components/header";

export const metadata = {
  title: "Profile",
  description: "User Profile",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="container pt-16">{children}</main>
    </>
  );
}
