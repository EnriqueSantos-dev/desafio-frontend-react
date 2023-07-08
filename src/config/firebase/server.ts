import admin from "firebase-admin";

import { env } from "@/env.mjs";
import { getAuth } from "firebase-admin/auth";

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: env.FIREBASE_CLIENT_EMAIL,
      privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    }),
  });
}

const adminAuth = getAuth();
const getAdminFireStore = () => admin.firestore();

export { adminAuth, getAdminFireStore };
