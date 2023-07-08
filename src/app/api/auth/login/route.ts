import { NextRequest, NextResponse } from "next/server";

import { env } from "@/env.mjs";
import { adminAuth } from "@/config/firebase/server";

export async function POST(request: NextRequest) {
  const idToken = request.headers.get("Authorization")?.replace("Bearer ", "");

  if (!idToken) {
    return NextResponse.json(
      { message: "Unexpected error on login" },
      { status: 401 }
    );
  }

  const expiresIn = env.EXPIRES_IN_SESSION;

  try {
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    });

    const isProduction = process.env.NODE_ENV === "production";

    const newHeaders = new Headers(request.headers);
    newHeaders.set(
      "Set-Cookie",
      `session=${sessionCookie}; HttpOnly; SameSite=Strict; Max-Age=${expiresIn}; Path=/; ${
        isProduction ? "Secure" : ""
      }`
    );

    return new Response(undefined, { headers: newHeaders });
  } catch (error) {
    console.log("[POST_LOGIN]", error);
    return NextResponse.json({ message: "internal server error" });
  }
}
