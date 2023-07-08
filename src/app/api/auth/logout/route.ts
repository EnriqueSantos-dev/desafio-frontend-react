import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_COOKIE_NAME } from "@/constants/session-cookie";

export async function POST() {
  const cookieSession = cookies().get(SESSION_COOKIE_NAME);

  if (!cookieSession) return NextResponse.json(null);

  cookies().set(SESSION_COOKIE_NAME, "", { maxAge: -1 });
  return NextResponse.json(null, { status: 200 });
}
