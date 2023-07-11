import { useState } from "react";

import * as Toggle from "@radix-ui/react-toggle";

import { ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
      defaultPressed={isSelected}
      onPressedChange={handlePress}
      className="group flex h-10 items-center space-x-2 rounded-md border border-neutral-200 px-4 py-2 text-sm text-neutral-900 shadow-sm hover:bg-neutral-100/10 data-[state=off]:bg-neutral-100 data-[state=on]:bg-neutral-400/10"
      {...props}
    >
      <span>Sort by rating</span>{" "}
      <ChevronDown
        size={18}
        className="transition-transform group-data-[state=on]:rotate-180"
      />
    </Toggle.Root>
  );
}
