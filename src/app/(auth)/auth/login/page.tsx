import { getAuthSession } from "@/services/users/get-auth-session";
import { FormLogin } from "./components/form-login";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getAuthSession();
  console.log(session);

  if (session) {
    redirect("/");
  }

  return (
    <>
      <div className="flex flex-col items-center rounded-2xl px-6 pb-8 pt-28">
        <h1 className="text-center text-2xl/8 font-bold text-neutral-900 dark:text-neutral-100">
          Login
        </h1>

        <p className="mt-1 w-2/4 text-center text-sm font-medium text-neutral-500">
          Discover your favorite game, rate it, share your favorites with
          friends, and have fun.
        </p>

        <FormLogin />
      </div>
    </>
  );
}
