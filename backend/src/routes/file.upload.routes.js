import Router from "express";
import { uploadController } from "./../controllers/upload.controller.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadRouter = Router();

uploadRouter.post("/uploads", upload.single("avatar"), uploadController);

export default uploadRouter;
