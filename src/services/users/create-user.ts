import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { clientAuth } from "@/config/firebase/client";
import { apiInternal } from "@/lib/axios";
import { BaseError } from "@/exeptions/base-error";
import { getFirebaseClientMessages } from "@/utils/get-firebase-client-messages";

export type CreateUserInput = {
  email: string;
  password: string;
};

export async function createUser({
  email,
  password,
}: CreateUserInput): Promise<void> {
  try {
    const { user } = await createUserWithEmailAndPassword(
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
