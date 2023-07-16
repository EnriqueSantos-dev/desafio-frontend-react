import { redirect } from "next/navigation";

import { getAuthSession } from "@/services/users/get-auth-session";
import { FormUpdateProfile } from "./components/update-profile-form";
import { Heading } from "@/components/shared/ui/heading";

export default async function ProfilePage() {
  const sessionData = await getAuthSession();

  if (!sessionData) redirect("/auth");

  return (
    <div className="w-full py-6 text-neutral-900 dark:text-neutral-100">
      <Heading.Root>
        <Heading.Title>Profile</Heading.Title>
        <Heading.Subtitle>Update your profile infos</Heading.Subtitle>
        <Heading.Separator />
      </Heading.Root>

      <div className="mx-auto mt-10 max-w-xl">
        <FormUpdateProfile
          defaultValues={{
            email: sessionData?.email,
            name: sessionData?.displayName,
            avatar: sessionData?.photoURL ?? "",
          }}
        />
      </div>
    </div>
  );
}
