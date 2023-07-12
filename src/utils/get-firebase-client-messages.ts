const FIREBASE_ERROS = {
  "auth/user-not-found": "User not found",
  "auth/wrong-password": "Email or password is incorrect",
  "auth/email-already-exists": "User already exists",
  "auth/email-already-in-use": "User already exists",
  "auth/too-many-requests": "Too many requests, try again later",
} as const;

export function getFirebaseClientMessages(keyError: string) {
  return (
    FIREBASE_ERROS[keyError as keyof typeof FIREBASE_ERROS] ??
    "Something want wrong!"
  );
}
