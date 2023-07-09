import { NextRequest, NextResponse } from "next/server";

import { SESSION_COOKIE_NAME } from "@/constants/session-cookie";

import { env } from "@/env.mjs";
import { adminAuth } from "@/config/firebase/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const idToken = request.headers.get("Authorization")?.replace("Bearer ", "");

  if (!idToken) {
    return NextResponse.json(
      { message: "Unexpected error on login" },
      { status: 401 }
    );
  }

  const expiresInMilleSeconds = env.EXPIRES_IN_SESSION;
  const expiresInSeconds = expiresInMilleSeconds / 1000;

  try {
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: expiresInMilleSeconds,
    });

    const isProduction = process.env.NODE_ENV === "production";

    const newHeaders = new Headers(request.headers);
    newHeaders.set(
      "Set-Cookie",
      `${SESSION_COOKIE_NAME}=${sessionCookie}; HttpOnly; SameSite=Strict; Max-Age=${expiresInSeconds}; Path=/; ${
        isProduction ? "Secure" : ""
      }`
    );

    // revalidate the index page to get current user
    revalidatePath("/");
    return new Response(undefined, { headers: newHeaders });
  } catch (error) {
    console.log("[POST_LOGIN]", error);
    return NextResponse.json({ message: "internal server error" });
  }
}
