import { adminAuth } from "@/config/firebase/server";
import { UserRecord } from "firebase-admin/auth";
import { cookies } from "next/headers";

export async function getAuthSession() {
  const sessionCookie = cookies().get("session");
  let userSession: UserRecord | null = null;

  if (sessionCookie) {
    const decodedClaims = await adminAuth.verifySessionCookie(
      sessionCookie.value,
      true
    );
    userSession = await adminAuth.getUser(decodedClaims.uid);
  }

  return userSession;
}
