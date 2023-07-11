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
import { useRouter } from "next/navigation";

export function AlertExpiredSession() {
  const [isMounted, setIsMounted] = useState(false);
  const { isExpired } = useAlertExpiredSessionStore();
  const mutation = useLogout();
  const router = useRouter();

  const onRedirectUser = () => {
    mutation.mutate({});
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (mutation.isSuccess) {
      router.push("/auth");
    }
  }, [mutation.isSuccess, router]);

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
            disabled={mutation.isLoading}
            onClick={onRedirectUser}
          >
            {mutation.isLoading && (
              <Loader size={20} className="mr-2 animate-spin" />
            )}
            {!mutation.isLoading && "Login"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
