const firebaseAuthClientErrosMessages = {
  "auth/user-not-found": "User not found",
  "auth/wrong-password": "Email or password is incorrect",
  "auth/email-already-exists": "User already exists",
  "auth/too-many-requests": "Too many requests, try again later",
};

export function getFirebaseClientMessages(
  keyError: keyof typeof firebaseAuthClientErrosMessages
) {
  return firebaseAuthClientErrosMessages[keyError];
}
