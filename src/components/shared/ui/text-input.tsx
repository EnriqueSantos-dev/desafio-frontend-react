import React from "react";

import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

type TextFieldRoot = React.HtmlHTMLAttributes<HTMLDivElement>;

const TextFieldRoot = React.forwardRef<HTMLDivElement, TextFieldRoot>(
  ({ children, ...props }, ref) => (
    <div
      className="flex h-12 w-full items-center gap-2 rounded-lg bg-neutral-50 px-4 shadow-innerShadowLight outline-none ring-amber-500 ring-offset-neutral-300 focus-within:outline-none focus-within:ring-1 focus-within:ring-offset-2 disabled:pointer-events-none disabled:opacity-70 dark:bg-neutral-950 dark:shadow-innerShadowDark dark:focus-within:ring-offset-neutral-950"
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
        "flex-1 h-full py-2 bg-transparent focus:outline-none dark:placeholder:text-neutral-500 dark:text-neutral-100 disabled:pointer-events-none",
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
        className={cn(
          "flex shrink-0 justify-center items-center first:w-6 first:h-6 dark:text-neutral-500 text-neutral-300 h-full transition-colors dark:hover:text-neutral-400",
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
