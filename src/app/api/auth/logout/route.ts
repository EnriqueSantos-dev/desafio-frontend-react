import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { revokeUserTokens } from "@/lib/shared-functions/revoke-user-tokens";

import { SESSION_COOKIE_NAME } from "@/constants/session-cookie";

export async function POST(request: NextRequest) {
  const cookieSession = cookies().get(SESSION_COOKIE_NAME);

  if (!cookieSession) return NextResponse.json(null);

  try {
    cookies().set("session", "", { maxAge: -1 });
    await revokeUserTokens(cookieSession.value);
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    console.log("POST_LOGOUT", error);

    // catch by axios interceptor
    return NextResponse.json(null, { status: 500 });
  }
}
