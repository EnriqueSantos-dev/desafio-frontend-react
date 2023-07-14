import { useState } from "react";

import * as Toggle from "@radix-ui/react-toggle";

import { ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button, buttonsVariants } from "@/components/shared/ui/button";

type MustAvailableProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function MustAvailable({ ...props }: MustAvailableProps) {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");
  const order = searchParams.get("order");
  const [isSelected, setIsSelected] = useState(() => {
    if (!sort && !order) return false;
    if (sort === "rating" && order === "desc") return true;
    return false;
  });
  const router = useRouter();
  const pathname = usePathname();

  const handlePress = () => {
    const newSearchParams = new URLSearchParams(window.location.search);

    if (sort === "rating" && order === "desc") {
      setIsSelected(false);
      newSearchParams.set("sort", "rating");
      newSearchParams.set("order", "asc");
      router.push(`${pathname}?${newSearchParams.toString()}`);
    } else {
      setIsSelected(true);
      newSearchParams.set("sort", "rating");
      newSearchParams.set("order", "desc");
      router.push(`${pathname}?${newSearchParams.toString()}`);
    }
  };

  return (
    <Toggle.Root
      {...props}
      defaultPressed={isSelected}
      onPressedChange={handlePress}
      className={buttonsVariants({
        variant: "outline",
        size: "md",
        className: "group",
      })}
    >
      <span>Sort by rating</span>{" "}
      <ChevronDown
        size={18}
        className="transition-transform group-data-[state=on]:rotate-180"
      />
    </Toggle.Root>
  );
}
