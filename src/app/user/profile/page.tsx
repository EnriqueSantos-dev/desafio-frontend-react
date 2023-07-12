import { redirect } from "next/navigation";

import { getAuthSession } from "@/services/users/get-auth-session";
import { FormUpdateProfile } from "./components/update-profile-form";

export default async function ProfilePage() {
  const sessionData = await getAuthSession();

  if (!sessionData) redirect("/auth");

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-neutral-900">Update Profile</h1>

      <p className="pb-1 text-sm">
        Update profile require new login to infos fully updated
      </p>
      <div className="mb-8 h-px w-full bg-neutral-200" />

      <div className="mx-auto xl:max-w-xl">
        <h2 className="mb-8 text-center text-xl font-semibold">User info</h2>
        <FormUpdateProfile
          defaultValues={{
            email: sessionData?.email,
            name: sessionData?.displayName,
          }}
        />
      </div>
    </div>
  );
}
