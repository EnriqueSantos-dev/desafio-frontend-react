import { apiInternal } from "@/lib/axios";

export async function deleteUserAccount(): Promise<void> {
  await apiInternal.delete("/api/auth/users/delete-account");
}
