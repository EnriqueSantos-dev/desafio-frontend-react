"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Eye, EyeOff, Loader } from "lucide-react";

import { LabelText } from "@/components/shared/ui/label-text";
import { Button } from "@/components/shared/ui/button";
import { TextField } from "@/components/shared/ui/text-input";
import { UploadImage } from "@/components/upload-image";

import { useToast } from "@/hooks/useToast";
import { useUpdateUserProfile } from "@/hooks/useUpdateUserProfile";

const formSchema = z
  .object({
    name: z.string().trim().max(50).optional(),
    email: z.string().email().optional(),
    avatar: z.any().optional(),
    password: z
      .string()
      .min(6)
      .optional()
      .or(z.literal(""))
      .transform((val) => (val === "" ? undefined : val)),
    confirmPassword: z
      .string()
      .min(6)
      .optional()
      .or(z.literal(""))
      .transform((val) => (val === "" ? undefined : val)),
  })
  .superRefine((data, ctx) => {
    if (!data.password && !data.confirmPassword) {
      return data;
    }

    if (data.confirmPassword !== data.password) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match",
        code: z.ZodIssueCode.custom,
      });

      return z.NEVER;
    }

    return data;
  });

type FormSchema = z.infer<typeof formSchema>;

type FormProps = {
  defaultValues: Omit<FormSchema, "confirmPassword" | "password">;
};

export function FormUpdateProfile({ defaultValues }: FormProps) {
  const mutation = useUpdateUserProfile();
  const router = useRouter();
  const [passwordsControlState, setPasswordsControlState] = useState({
    password: false,
    confirmPassword: false,
  });
  const { error: toastError, success: toastSuccess } = useToast();
  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    formState: { errors },
  } = useForm<FormSchema>({
    defaultValues: {
      ...defaultValues,
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(formSchema),
  });

  const submitHandler: SubmitHandler<FormSchema> = async (values) => {
    mutation.mutate({
      avatar: values.avatar,
      email: values.email,
      name: values.name,
      password: values.password,
    });
  };

  const handleTogglePassword = (key: keyof typeof passwordsControlState) => {
    setPasswordsControlState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    if (mutation.error) {
      toastError(mutation.error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.error]);

  useEffect(() => {
    if (mutation.isSuccess && mutation.data) {
      resetField("avatar");
      router.refresh();
      toastSuccess(mutation.data.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.isSuccess, mutation.data]);

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(submitHandler, (e) => console.log(e))}
    >
      <UploadImage
        {...register("avatar")}
        onChangeValue={(value) => setValue("avatar", value)}
        onResetField={() => resetField("avatar")}
        defaultFileUrl={defaultValues.avatar}
      />

      <LabelText.Root>
        <LabelText.Label htmlFor="name">Name</LabelText.Label>
        <TextField.Root>
          <TextField.Field
            id="name"
            type="text"
            placeholder="John Doe"
            {...register("name")}
          />
        </TextField.Root>
        <LabelText.ErrorMessage>{errors.name?.message}</LabelText.ErrorMessage>
      </LabelText.Root>

      <LabelText.Root>
        <LabelText.Label htmlFor="email">Email</LabelText.Label>
        <TextField.Root>
          <TextField.Field
            id="email"
            type="email"
            placeholder="johndoe@gmail.com"
            {...register("email")}
          />
        </TextField.Root>
        <LabelText.ErrorMessage>{errors.email?.message}</LabelText.ErrorMessage>
      </LabelText.Root>

      <LabelText.Root>
        <LabelText.Label htmlFor="password">Password</LabelText.Label>
        <TextField.Root>
          <TextField.Field
            id="password"
            type={passwordsControlState.password ? "text" : "password"}
            placeholder="******"
            {...register("password")}
          />
          <TextField.Addon
            type="button"
            aria-label="toggle visibility password"
            onClick={() => handleTogglePassword("password")}
          >
            {passwordsControlState.password ? (
              <Eye size={20} />
            ) : (
              <EyeOff size={20} />
            )}
          </TextField.Addon>
        </TextField.Root>
        <LabelText.ErrorMessage>
          {errors.password?.message}
        </LabelText.ErrorMessage>
      </LabelText.Root>

      <LabelText.Root>
        <LabelText.Label htmlFor="confirmPassword">
          Confirm Password
        </LabelText.Label>
        <TextField.Root>
          <TextField.Field
            id="confirmPassword"
            type={passwordsControlState.confirmPassword ? "text" : "password"}
            placeholder="******"
            {...register("confirmPassword")}
          />
          <TextField.Addon
            type="button"
            aria-label="toggle visibility password"
            onClick={() => handleTogglePassword("confirmPassword")}
          >
            {passwordsControlState.confirmPassword ? (
              <Eye size={20} />
            ) : (
              <EyeOff size={20} />
            )}
          </TextField.Addon>
        </TextField.Root>
        <LabelText.ErrorMessage>
          {errors.confirmPassword?.message}
        </LabelText.ErrorMessage>
      </LabelText.Root>

      <p className="text-center text-sm font-medium text-neutral-800 dark:text-neutral-400">
        <span className="text-lg">🔒</span>Security Notice: Your password has
        not been autofilled for security reasons.
      </p>

      <Button
        type="submit"
        className="mx-auto mt-4 w-[200px]"
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? (
          <Loader size={20} className="animate-spin" />
        ) : (
          "Save changes"
        )}
      </Button>
    </form>
  );
}
