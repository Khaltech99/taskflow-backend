import { storageService } from "../service/storageService.js";
import { catchAsync } from "../utils/catchAsync.js";
import sharp from "sharp";

export const uploadController = catchAsync(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const processedImage = await sharp(req.file.buffer)
    .resize(800, 600)
    .jpeg({ quality: 80 })
    .toBuffer();

  const cloudUploadResult = await storageService({
    buffer: processedImage,
  });

  return res
    .status(200)
    .json({ message: "File uploaded successfully", data: cloudUploadResult });
});
