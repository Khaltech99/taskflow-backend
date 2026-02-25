import cloudinary from "../config/cloudinaryConfig.js";
import { Readable } from "stream";

export const storageService = async ({ buffer, option = {} }) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "folder_avatars",
        resource_type: "image",
        ...option,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        } else {
          return resolve(result);
        }
      },
    );

    Readable.from(buffer).pipe(uploadStream);
  });
};
