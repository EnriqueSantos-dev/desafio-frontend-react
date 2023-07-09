"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { buttonsVariants } from "@/components/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/shared/ui/dialog";
import { useAlertUnauthorizedStore } from "@/hooks/useAlertUnauthorizedStore";

export function AlertUnauthorizedUser() {
  const {
    isAlertUnauthorized,
    descriptionAlertMessage,
    setIsAlertUnauthorized,
  } = useAlertUnauthorizedStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // avoid hydration mismatch
  if (!isMounted) return null;

  return (
    <Dialog open={isAlertUnauthorized} onOpenChange={setIsAlertUnauthorized}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            <span className="relative bottom-0.5 inline-block">🔒</span>{" "}
            Unauthorized
          </DialogTitle>
          <DialogDescription className="text-center">
            {descriptionAlertMessage}
          </DialogDescription>
        </DialogHeader>

        <div className="mx-auto mt-4 w-1/2">
          <Link
            href="/auth/login"
            onClick={() => setIsAlertUnauthorized(false)}
            className={buttonsVariants({
              variant: "neutral",
              className: "w-full",
            })}
          >
            Login
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
