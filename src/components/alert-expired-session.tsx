"use client";

import { useEffect, useState } from "react";

import { Loader } from "lucide-react";

import { Button } from "@/components/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/shared/ui/dialog";

import { useLogout } from "@/hooks/useLogout";
import { useAlertExpiredSessionStore } from "@/hooks/useAlertExpiredSessionStore";

export function AlertExpiredSession() {
  const [isMounted, setIsMounted] = useState(false);
  const { isExpired } = useAlertExpiredSessionStore();
  const { mutate, isLoading } = useLogout();

  const onRedirectUser = () => {
    mutate({});
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Dialog defaultOpen={isExpired} open={isExpired}>
      <DialogContent
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="">
          <DialogTitle className="text-center text-xl">
            ⏳ Your session has expired
          </DialogTitle>
          <DialogDescription className="text-center">
            Try login again
          </DialogDescription>
        </DialogHeader>

        <div className="mx-auto mt-4 flex w-1/2 justify-center">
          <Button
            variant="blue"
            size="md"
            className="w-full"
            disabled={isLoading}
            onClick={onRedirectUser}
          >
            {isLoading && <Loader size={20} className="mr-2 animate-spin" />}
            {!isLoading && "Login"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
