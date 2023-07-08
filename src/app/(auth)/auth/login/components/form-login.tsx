"use client";

import { useEffect, useState } from "react";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader } from "lucide-react";

import { LabelText } from "@/components/shared/label-text";
import { Button } from "@/components/shared/ui/button";
import { TextField } from "@/components/shared/ui/text-input";
import { useLogin } from "@/hooks/useLogin";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type FormValues = z.infer<typeof formSchema>;

export function FormLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const mutation = useLogin();
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
      toast.error(mutation.error.message);
    }
  }, [mutation.error]);

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success("Login successfully, redirecting...");
      router.push("/");
    }
  }, [mutation.isSuccess, router]);

  return (
    <div className="mx-auto mt-10 w-3/5">
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
    </div>
  );
}
