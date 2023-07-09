"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader } from "lucide-react";

import { LabelText } from "@/components/shared/label-text";
import { Button } from "@/components/shared/ui/button";
import { TextField } from "@/components/shared/ui/text-input";

import { useLogin } from "@/hooks/useLogin";
import { useToast } from "@/hooks/useToast";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type FormValues = z.infer<typeof formSchema>;

export function FormLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const { success, error } = useToast();
  const mutation = useLogin();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const submitHandler: SubmitHandler<FormValues> = (data) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    if (mutation.error) {
      error(mutation.error.message);
    }
  }, [mutation.error, error]);

  useEffect(() => {
    if (mutation.isSuccess) {
      success("Login successfully, redirecting...");
      // reload window force layout to re-render and redirect to home page if user is logged in
      window.location.reload();
    }
  }, [mutation.isSuccess, success]);

  return (
    <div className="space-y-4">
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(submitHandler)}
      >
        <LabelText.Root>
          <LabelText.Label htmlFor="email">Email</LabelText.Label>
          <TextField.Root>
            <TextField.Field
              type="email"
              placeholder="email@gmail.com"
              {...register("email")}
            />
          </TextField.Root>
          {errors.email && (
            <LabelText.ErrorMessage>
              {errors.email.message}
            </LabelText.ErrorMessage>
          )}
        </LabelText.Root>

        <LabelText.Root>
          <LabelText.Label htmlFor="password">Password</LabelText.Label>
          <TextField.Root>
            <TextField.Field
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="********"
            />
            <TextField.Addon
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </TextField.Addon>
          </TextField.Root>
          {errors.password && (
            <LabelText.ErrorMessage>
              {errors.password.message}
            </LabelText.ErrorMessage>
          )}
        </LabelText.Root>

        <div className="mx-auto mt-3 w-2/4">
          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? (
              <Loader size={20} className="animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm font-medium">
          No have account?&nbsp;
          <Link href="/auth/sign-up" className="text-blue-500 underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
