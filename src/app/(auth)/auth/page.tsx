import Image from "next/image";
import { redirect } from "next/navigation";

import { getAuthSession } from "@/services/users/get-auth-session";
import { LoginForm } from "./components/login-form";
import { SignUpForm } from "./components/signup-form";

export default async function LoginPage() {
  const session = await getAuthSession();

  if (session) {
    redirect("/");
  }

  return (
    <>
      <div className="mx-auto flex w-full flex-col items-stretch justify-center rounded-2xl px-6 md:w-4/5 xl:w-full xl:px-28 2xl:px-48">
        <div>
          <h1 className="text-center text-3xl/10 font-bold text-neutral-900 dark:text-neutral-100">
            Welcome
          </h1>

          <p className="mb-12 mt-1 text-center text-sm font-medium text-neutral-600 xl:mx-auto xl:w-3/5">
            Discover your favorite game, rate it, share your favorites with
            friends, and have fun.
          </p>
        </div>

        <LoginForm />
        <div className="mx-auto my-4 flex w-4/5 items-center space-x-3">
          <span className="inline-block h-px flex-1 rounded-full bg-neutral-300" />
          <span className="text-sm font-semibold text-neutral-900">OR</span>
          <span className="inline-block h-px flex-1 rounded-full bg-neutral-300" />
        </div>
        <SignUpForm />
      </div>

      <div className="hidden rounded-lg bg-blue-200 lg:flex lg:items-center lg:justify-center">
        <Image
          src="/login-illustration.svg"
          alt="illustration"
          width={500}
          height={500}
          priority
        />
      </div>
    </>
  );
}
