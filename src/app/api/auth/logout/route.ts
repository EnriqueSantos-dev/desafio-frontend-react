import { revokeUserTokens } from "@/lib/shared-functions/revoke-user-tokens";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const cookieSession = cookies().get("session");

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
