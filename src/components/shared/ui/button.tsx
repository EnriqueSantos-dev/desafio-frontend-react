import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

export const buttonsVariants = cva(
  "focus-state inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:pointer-events-none",
  {
    variants: {
      variant: {
        neutral:
          "bg-neutral-950 text-neutral-100 ring-neutral-950 ring-offset-2 ring-offset-neutral-50 hover:bg-neutral-900 focus-visible:ring-2 dark:bg-neutral-100 dark:text-neutral-900 dark:ring-offset-neutral-900 dark:hover:bg-neutral-200 dark:focus-visible:ring-neutral-100",
        red: "bg-red-500 text-white ring-red-500 hover:bg-red-600 dark:bg-red-600 dark:ring-offset-neutral-900 dark:hover:bg-red-700",
        blue: "bg-blue-500 text-white ring-blue-600 ring-offset-blue-300 hover:bg-blue-600 dark:bg-blue-600 dark:ring-blue-600 dark:ring-offset-neutral-900 dark:hover:bg-blue-700",
        green:
          "bg-green-300 text-neutral-900 ring-green-500 ring-offset-green-300 hover:bg-green-400 dark:bg-green-600 dark:text-white dark:ring-offset-neutral-900 dark:hover:bg-green-700",
        outline:
          "border border-neutral-300 bg-neutral-100 ring-neutral-200 ring-offset-neutral-100 hover:bg-neutral-200 focus-visible:ring-1 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:ring-neutral-800 dark:ring-offset-neutral-900 dark:hover:bg-neutral-900",
      },
      size: {
        md: "h-10 px-4 py-2",
        lg: "h-12 px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "lg",
    },
  }
);

type ButtonProps = VariantProps<typeof buttonsVariants> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type, className, variant, size, ...props }, ref) => (
    <button
      type={type ?? "button"}
      ref={ref}
      className={cn(buttonsVariants({ variant, size, className }))}
      {...props}
    />
  )
);

Button.displayName = "Button";
