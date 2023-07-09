import admin from "firebase-admin";

import { env } from "@/env.mjs";
import { getAuth } from "firebase-admin/auth";
import { getDatabase } from "firebase-admin/database";

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: env.FIREBASE_CLIENT_EMAIL,
      privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    }),
    databaseURL: "https://desafio-frontend-react-default-rtdb.firebaseio.com",
  });
}

const adminAuth = getAuth();
const getDatabaseAdmin = () => getDatabase();

export { adminAuth, getDatabaseAdmin };
