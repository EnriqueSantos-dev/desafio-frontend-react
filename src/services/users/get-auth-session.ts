import { cookies } from "next/headers";

import { adminAuth } from "@/config/firebase/server";

import { SESSION_COOKIE_NAME } from "@/constants/session-cookie";
import { mapSessionData } from "@/utils/map-session-data";
import { SessionData } from "@/types";

export async function getAuthSession() {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME);
  let userSession: SessionData | null = null;

  try {
    if (sessionCookie) {
      const decodedClaims = await adminAuth.verifySessionCookie(
        sessionCookie.value,
        true
      );

      const dbData = await adminAuth.getUser(decodedClaims.uid);
      userSession = mapSessionData(dbData);
    }
  } catch (e) {}

  return userSession;
}
