import { usePathname, useRouter } from "next/navigation";

import { FilterX } from "lucide-react";

import { Button } from "@/components/shared/ui/button";

export function ClearFiltersButton() {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    router.push(pathname);
  };

  return (
    <Button
      type="button"
      size="md"
      variant="red"
      aria-label="clear filters"
      title="clear filters"
      className="px-3"
      onClick={handleClick}
    >
      <FilterX size={20} className="fill-neutral-100" />
    </Button>
  );
}
