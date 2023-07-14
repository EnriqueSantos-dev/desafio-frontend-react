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
      <div className="mx-auto flex w-full max-w-lg flex-col items-stretch justify-center rounded-2xl text-neutral-900 dark:text-neutral-100">
        <div>
          <h1 className="text-center text-2xl/8 font-bold">Welcome</h1>
          <p className="mb-12 mt-1 text-center text-sm font-medium text-neutral-600 dark:text-neutral-300">
            Discover your favorite game, rate it, share your favorites with
            friends, and have fun.
          </p>
        </div>

        <LoginForm />
        <div className="mx-auto my-8 flex w-4/5 items-center space-x-3">
          <span className="inline-block h-px flex-1 rounded-full bg-neutral-300 dark:bg-neutral-800" />
          <span className="text-sm font-semibold">OR</span>
          <span className="inline-block h-px flex-1 rounded-full bg-neutral-300 dark:bg-neutral-800" />
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
