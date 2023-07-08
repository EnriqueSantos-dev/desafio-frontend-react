import { clientAuth } from "@/config/firebase/client";
import { apiInternal } from "@/lib/axios";
import { signInWithEmailAndPassword } from "firebase/auth";

export type LoginUserInput = {
  email: string;
  password: string;
};

export async function loginUser({ email, password }: LoginUserInput) {
  try {
    const { user } = await signInWithEmailAndPassword(
      clientAuth,
      email,
      password
    );

    const idToken = await user.getIdToken();

    await apiInternal.post("/api/auth/login", null, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
  } catch (error) {
    throw error;
  }
}
