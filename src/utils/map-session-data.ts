import { SessionData } from "@/types";
import { UserRecord } from "firebase-admin/auth";

export function mapSessionData(session: UserRecord): SessionData {
  return {
    uid: session.uid,
    email: session.email,
    displayName: session.displayName,
    photoURL: session.photoURL,
  };
}
