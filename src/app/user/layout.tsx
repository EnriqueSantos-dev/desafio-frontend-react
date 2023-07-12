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
      {/* <Header /> */}
      <main className="container pt-20">{children}</main>
    </>
  );
}
