import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";
import React from "react";

type TextFieldRoot = React.HtmlHTMLAttributes<HTMLDivElement>;

const TextFieldRoot = React.forwardRef<HTMLDivElement, TextFieldRoot>(
  ({ children, className, ...props }, ref) => (
    <div
      className={cn(
        "flex h-12 w-full items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 outline-none ring-neutral-200 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 disabled:pointer-events-none disabled:opacity-70 dark:bg-neutral-950 dark:ring-neutral-800 dark:focus-within:ring-offset-neutral-900 focus-within:border-transparent",
        className
      )}
      tabIndex={-1}
      {...props}
      ref={ref}
    >
      {children}
    </div>
  )
);

TextFieldRoot.displayName = "TextFieldRoot";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      {...props}
      className={cn(
        "flex-1 h-full py-2 focus:outline-none dark:placeholder:text-neutral-500 dark:text-neutral-100 disabled:pointer-events-none text-sm text-neutral-900 px-4",
        className
      )}
      ref={ref}
    />
  )
);

Input.displayName = "Input";

type TextFieldAddonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};

const TextFieldAddon = React.forwardRef<HTMLButtonElement, TextFieldAddonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        type="button"
        className={cn(
          "flex shrink-0 justify-center items-center first:w-6 first:h-6 dark:text-neutral-500 text-neutral-400 h-full transition-colors dark:hover:text-neutral-400 disabled:pointer-events-none px-2 hover:text-neutral-500",
          className
        )}
        {...props}
        ref={ref}
      />
    );
  }
);

TextFieldAddon.displayName = "TextFieldAddon";

export const TextField = {
  Root: TextFieldRoot,
  Field: Input,
  Addon: TextFieldAddon,
};
