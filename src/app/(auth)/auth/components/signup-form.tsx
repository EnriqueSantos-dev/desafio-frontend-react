"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LabelText } from "@/components/shared/label-text";
import { Button } from "@/components/shared/ui/button";
import { TextField } from "@/components/shared/ui/text-input";

import { useCreateUser } from "@/hooks/useCreateUser";
import { useToast } from "@/hooks/useToast";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormValues = z.infer<typeof formSchema>;

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { success, error } = useToast();
  const mutation = useCreateUser();
  const router = useRouter();
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
      success("Account created, redirecting to home..");
      router.push("/");
    }
  }, [mutation.isSuccess, router, success]);

  return (
    <div className="space-y-4">
      <h2 className="mb-6 text-center text-xl font-bold">Sign Up</h2>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(submitHandler)}
      >
        <LabelText.Root>
          <LabelText.Label htmlFor="signup-email">Email</LabelText.Label>
          <TextField.Root>
            <TextField.Field
              id="signup-email"
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
          <LabelText.Label htmlFor="signup-password">Password</LabelText.Label>
          <TextField.Root>
            <TextField.Field
              id="signup-password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="********"
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
            variant="green"
          >
            {mutation.isLoading ? (
              <Loader size={20} className="animate-spin" />
            ) : (
              "Create account"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
