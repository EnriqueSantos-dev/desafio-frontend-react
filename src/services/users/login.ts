import { clientAuth } from "@/config/firebase/client";
import { BaseError } from "@/exeptions/base-error";
import { apiInternal } from "@/lib/axios";
import { getFirebaseClientMessages } from "@/utils/get-firebase-client-messages";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";

export type LoginUserInput = {
  email: string;
  password: string;
};

export async function loginUser({
  email,
  password,
}: LoginUserInput): Promise<void> {
  try {
    const { user } = await signInWithEmailAndPassword(
      clientAuth,
      email,
      password
    );

    const idToken = await user.getIdToken();

    await apiInternal.post("/api/auth/sessions", null, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new BaseError(
        getFirebaseClientMessages(
          error.code as keyof typeof getFirebaseClientMessages
        )
      ).toPlainObject();
    }

    throw error;
  }
}
