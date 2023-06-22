import { cn } from "@/lib/utils";
import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const TextInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      {...props}
      ref={ref}
      className={cn(
        "w-full px-4 py-2 h-12 focus-state ring-amber-500 dark:text-neutral-100 dark:placeholder:text-neutral-600 bg-neutral-100 rounded-lg dark:bg-neutral-950 dark:focus-visible:ring-offset-neutral-950 ring-offset-neutral-300 dark:shadow-innerShadowDark shadow-innerShadowLight disabled:pointer-events-none disabled:opacity-70",
        className
      )}
    />
  )
);

TextInput.displayName = "TextInput";
