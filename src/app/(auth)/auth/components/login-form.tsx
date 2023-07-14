"use client";

import { useEffect, useState } from "react";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader } from "lucide-react";

import { LabelText } from "@/components/shared/ui/label-text";
import { Button } from "@/components/shared/ui/button";
import { TextField } from "@/components/shared/ui/text-input";

import { useLogin } from "@/hooks/useLogin";
import { useToast } from "@/hooks/useToast";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type FormValues = z.infer<typeof formSchema>;

export function LoginForm() {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.error]);

  useEffect(() => {
    if (mutation.isSuccess) {
      success("Login successfully, redirecting...");
      // reload window force layout to re-render and redirect to home page if user is logged in
      window.location.reload();
    }
  }, [mutation.isSuccess, success]);

  return (
    <div className="space-y-4">
      <h2 className="mb-6 text-center text-xl font-bold">Login</h2>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(submitHandler)}
      >
        <LabelText.Root>
          <LabelText.Label htmlFor="login-email">Email</LabelText.Label>
          <TextField.Root>
            <TextField.Field
              id="login-email"
              type="email"
              placeholder="email@gmail.com"
              {...register("email")}
              autoComplete="email"
            />
          </TextField.Root>
          {errors.email && (
            <LabelText.ErrorMessage>
              {errors.email.message}
            </LabelText.ErrorMessage>
          )}
        </LabelText.Root>

        <LabelText.Root>
          <LabelText.Label htmlFor="login-password">Password</LabelText.Label>
          <TextField.Root>
            <TextField.Field
              id="login-password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="********"
              autoComplete="current-password"
            />
            <TextField.Addon
              type="button"
              aria-label="toggle visibility password"
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
    </div>
  );
}
