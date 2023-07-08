import { UserRecord } from "firebase-admin/auth";

import { cookies } from "next/headers";

import { adminAuth } from "@/config/firebase/server";

import { SESSION_COOKIE_NAME } from "@/constants/session-cookie";

export async function getAuthSession() {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME);
  let userSession: UserRecord | null = null;

  try {
    if (sessionCookie) {
      const decodedClaims = await adminAuth.verifySessionCookie(
        sessionCookie.value,
        true
      );

      userSession = await adminAuth.getUser(decodedClaims.uid);
    }
  } catch (e) {}

  return userSession;
}
