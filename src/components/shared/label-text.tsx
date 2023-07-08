import React from "react";

import { cn } from "@/lib/utils";

type LabelTextProps = React.LabelHTMLAttributes<HTMLLabelElement>;

const Root = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div className={cn("space-y-2", className)} {...props} ref={ref}>
    {children}
  </div>
));

const Label = React.forwardRef<HTMLLabelElement, LabelTextProps>(
  ({ className, children, ...props }, ref) => (
    <label
      {...props}
      className={cn(
        "inline-block cursor-pointer font-medium text-sm text-neutral-900 dark:text-neutral-100",
        className
      )}
      ref={ref}
    >
      {children}
    </label>
  )
);

const ErrorMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    role="alert"
    className={cn("text-sm text-red-500 px-1", className)}
    {...props}
    ref={ref}
  />
));

Root.displayName = "LabelText.Root";
Label.displayName = "LabelText.Label";
ErrorMessage.displayName = "LabelText.ErrorMessage";

export const LabelText = {
  Root,
  Label,
  ErrorMessage,
};
