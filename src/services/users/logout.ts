import { apiInternal } from "@/lib/axios";

export async function logoutUser(): Promise<void> {
  await apiInternal.post("/api/auth/logout");
}
