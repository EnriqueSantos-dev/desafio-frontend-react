import { adminAuth } from "@/config/firebase/server";

export async function revokeUserTokens(cookie: string) {
  const claims = await adminAuth.verifySessionCookie(cookie);
  await adminAuth.revokeRefreshTokens(claims.sub);
}
