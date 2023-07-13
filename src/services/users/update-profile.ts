import { apiInternal } from "@/lib/axios";
import { UpdateUserProfile } from "@/types";

export type UpdateUserProfileInput = UpdateUserProfile;

export type UpdateUserProfileResponse = {
  message: string;
};

export async function updateUserProfile(
  input: UpdateUserProfileInput
): Promise<UpdateUserProfileResponse> {
  const { data } = await apiInternal.put("/api/auth/users/profile", input);

  return data;
}
