import { env } from "@/env.mjs";

import { getApps, initializeApp } from "firebase/app";
import { getAuth, inMemoryPersistence } from "firebase/auth";

if (getApps().length === 0) {
  initializeApp({
    apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
  });
}

const clientAuth = getAuth();

// no persistence in client side
clientAuth.setPersistence(inMemoryPersistence);

export { clientAuth };
