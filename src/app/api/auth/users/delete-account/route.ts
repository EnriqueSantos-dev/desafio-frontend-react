import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_COOKIE_NAME } from "@/constants/session-cookie";

import { adminAuth } from "@/config/firebase/server";

import { withAuthRoute } from "@/utils/with-auth-hoc";

export const DELETE = withAuthRoute(async ({ user }) => {
  try {
    await adminAuth.deleteUser(user.uid);
    cookies().set(SESSION_COOKIE_NAME, "", { maxAge: -1 });

    return NextResponse.json({ message: "Account deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Fail on delete account", from: "route_handler" },
      { status: 500 }
    );
  }
});
