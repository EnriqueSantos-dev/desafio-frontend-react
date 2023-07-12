"use client";

import { AlertDeleteAccount } from "./alert-delete-account";
import { AlertExpiredSession } from "./alert-expired-session";
import { AlertUnauthorizedUser } from "./alert-unauthorized-user";

export function Alerts() {
  return (
    <>
      <AlertUnauthorizedUser />
      <AlertExpiredSession />
      <AlertDeleteAccount />
    </>
  );
}
