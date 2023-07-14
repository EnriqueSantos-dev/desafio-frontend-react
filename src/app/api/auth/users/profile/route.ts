import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { FirebaseError } from "firebase/app";

import { z } from "zod";

import { adminAuth } from "@/config/firebase/server";
import { uploadImage } from "@/lib/cloudinary";
import { withAuthRoute } from "@/utils/with-auth-hoc";

import { getFirebaseClientMessages } from "@/utils/get-firebase-client-messages";
import { SESSION_COOKIE_NAME } from "@/constants/session-cookie";

const schema = z.object({
  // File api is not allowed in server side
  avatar: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
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

    const { email, name, password, avatar } = parsedBody.data;
    let avatarUrl: string | null = null;
    const isAvatarChanged = avatar !== user.photoURL;

    if (
      avatar &&
      new RegExp(/^data:image\/(png|jpe?g|gif);base64,/).test(avatar) &&
      isAvatarChanged
    ) {
      const { secure_url } = await uploadImage(avatar);
      avatarUrl = secure_url;
    }

    const objectToUpdate = {
      displayName: name,
      email,
      password,
      [isAvatarChanged ? "photoURL" : ""]: avatarUrl,
    };

    await adminAuth.updateUser(user.uid, objectToUpdate);

    // changes email require user to reauthenticate, because firebase revoke the cookie session
    if (email && email !== user.email) {
      cookies().set(SESSION_COOKIE_NAME, "", { maxAge: -1 });
    }

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
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
