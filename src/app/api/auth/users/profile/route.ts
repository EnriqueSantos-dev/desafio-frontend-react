import { NextResponse } from "next/server";

import { FirebaseError } from "firebase/app";

import { z } from "zod";

import { adminAuth } from "@/config/firebase/server";

import { getFirebaseClientMessages } from "@/utils/get-firebase-client-messages";
import { withAuthRoute } from "@/utils/with-auth-hoc";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/constants/session-cookie";

const schema = z.object({
  displayName: z.string().optional(),
  email: z.string().email().optional(),
  passwordHash: z.string().min(6).optional(),
});

export const PUT = withAuthRoute(async ({ request, user }) => {
  try {
    const body = await request.json();
    const parsedBody = schema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { message: parsedBody.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, displayName, passwordHash } = parsedBody.data;
    console.log("PUT_UPDATE_PROFILE", parsedBody.data);

    await adminAuth.updateUser(user.uid, {
      displayName,
      email,
      password: passwordHash,
    });

    cookies().set(SESSION_COOKIE_NAME, "", { maxAge: -1 });
    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.log("PUT_UPDATE_PROFILE_ERROR", error);

    if (error instanceof FirebaseError) {
      return NextResponse.json(
        { message: getFirebaseClientMessages(error.code) },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error", from: "route_handler" },
      { status: 500 }
    );
  }
});
