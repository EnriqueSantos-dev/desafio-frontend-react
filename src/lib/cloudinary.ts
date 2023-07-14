import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from "cloudinary";

import { env } from "@/env.mjs";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUNDINARY_API_SECRET,
});

export async function uploadImage(
  base64: string
): Promise<UploadApiResponse | UploadApiErrorResponse> {
  return new Promise(async (resolve, reject) => {
    cloudinary.uploader
      .upload(base64, {
        folder: env.CLOUDINARY_FOLDER,
      })
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
}
