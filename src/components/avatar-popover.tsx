"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { Loader, LogOut, Settings, User, UserX } from "lucide-react";

import { SessionData } from "@/types";

import { Button } from "@/components/shared/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shared/ui/popover";
import { useLogout } from "@/hooks/useLogout";
import { useToast } from "@/hooks/useToast";
import { useAlertDeleteAccountStore } from "@/hooks/useAlertDeleteAccountStore";

export function AvatarProfile({ sessionData }: { sessionData: SessionData }) {
  const { displayName, email, photoURL } = sessionData;
  const logoutMutation = useLogout();
  const { success, error } = useToast();
  const showAlertDeleteAccount = useAlertDeleteAccountStore(
    (state) => state.setIsDeleteAccountModalOpen
  );

  useEffect(() => {
    if (logoutMutation.isSuccess) {
      success("Log out successfully");
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoutMutation.isSuccess]);

  useEffect(() => {
    if (logoutMutation.isError) {
      error(logoutMutation.error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoutMutation.isError, logoutMutation.error]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-label="open popover user details"
          className="relative h-11 w-11 overflow-hidden rounded-full p-0"
        >
          {photoURL ? (
            <Image
              src={photoURL}
              alt="user profile avatar"
              className="object-fill"
              fill
              priority
            />
          ) : (
            <User className="h-5 w-5 shrink-0" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="px-0 pb-0">
        <div className="flex items-center gap-4 px-6">
          <div>
            <Button className="pointer-events-none relative inline-block h-11 w-11 overflow-hidden rounded-full">
              {photoURL ? (
                <Image src={photoURL} alt="user profile avatar" fill priority />
              ) : (
                <User className="h-4 w-4 shrink-0" />
              )}
            </Button>
          </div>

          <div className="flex flex-col overflow-hidden">
            <p className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-[15px] font-semibold">
              {displayName || email?.substring(0, email.indexOf("@"))}
            </p>
            <small className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
              {email}
            </small>
          </div>
        </div>
        <ul className="mt-4">
          <li>
            <Link
              href="/user/profile"
              className="flex w-full items-center gap-4 bg-neutral-100 px-6 py-3 text-[13px] transition-colors hover:bg-neutral-200"
            >
              <Settings size={18} className="w-11" />
              <span>Update profile</span>
            </Link>
          </li>
          <li>
            <button
              type="button"
              aria-label="delete account trigger modal"
              onClick={() => showAlertDeleteAccount(true)}
              className="flex w-full items-center gap-4 bg-neutral-100 px-6 py-3 text-[13px] transition-colors hover:bg-neutral-200"
            >
              <UserX size={18} className="w-11" />
              <span>Delete account</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              aria-label="logout user"
              className="flex w-full items-center gap-4 bg-neutral-100 px-6 py-3 text-[13px] transition-colors hover:bg-neutral-200"
              onClick={() => logoutMutation.mutate({})}
            >
              {logoutMutation.isLoading ? (
                <Loader size={18} className="w-11 animate-spin" />
              ) : (
                <LogOut size={18} className="w-11" />
              )}
              <span>Sign out</span>
            </button>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
