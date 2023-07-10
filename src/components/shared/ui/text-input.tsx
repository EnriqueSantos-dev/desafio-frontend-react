import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";
import React from "react";

type TextFieldRoot = React.HtmlHTMLAttributes<HTMLDivElement>;

const TextFieldRoot = React.forwardRef<HTMLDivElement, TextFieldRoot>(
  ({ children, className, ...props }, ref) => (
    <div
      className={cn(
        "flex h-12 w-full items-center rounded-lg dark:bg-neutral-950 shadow-innerShadowLight dark:shadow-innerShadowDark px-2 py-1 ring-offset-neutral-50 ring-offset-2 dark:ring-offset-neutral-950 bg-neutral-50 placeholder:text-neutral-500 dark:placeholder:text-neutral-600 focus-state disabled:cursor-not-allowed disabled:opacity-50 dark:text-neutral-100 ring-neutral-200 dark:ring-neutral-800 hover:ring-2 dark:hover:ring-neutral-800 transition-all",
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
        "flex-1 h-full py-1 focus:outline-none dark:placeholder:text-neutral-500 dark:text-neutral-100 disabled:pointer-events-none text-sm text-neutral-900 px-2",
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
          "flex shrink-0 justify-center items-center dark:text-neutral-500 text-neutral-400 h-auto transition-colors dark:hover:text-neutral-400 disabled:pointer-events-none p-2 hover:text-neutral-500 bg-transparent",
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
