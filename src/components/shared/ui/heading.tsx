import { cn } from "@/lib/utils";
import React from "react";

function Root({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col">{children}</div>;
}

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
} & React.HTMLAttributes<HTMLHeadingElement>;

function Title({ children, className, ...props }: HeadingProps) {
  const Component = props.as || "h1";

  return (
    <Component
      {...props}
      className={cn(
        "text-xl md:text-2xl font-bold text-neutral-900 dark:text-neutral-100",
        className
      )}
    >
      {children}
    </Component>
  );
}

function Subtitle({ children, className, ...props }: HeadingProps) {
  const Component = props.as || "h2";

  return (
    <Component
      {...props}
      className={cn(
        "text-sm font-medium text-neutral-500 dark:text-neutral-500 ml-px",
        className
      )}
    >
      {children}
    </Component>
  );
}

function Separator() {
  return (
    <div className="mt-1 h-px w-full bg-neutral-200 dark:bg-neutral-800"></div>
  );
}

export const Heading = {
  Root,
  Title,
  Subtitle,
  Separator,
};
