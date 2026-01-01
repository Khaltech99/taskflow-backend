import Router from "express";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller.js";
import validate from "../middleware/validate.js";
import { LoginSchema, RegisterSchema } from "../schema/validate.schema.js";

const authRouter = Router();

authRouter.post("/register", validate(RegisterSchema), registerController);
authRouter.post("/login", validate(LoginSchema), loginController);

export default authRouter;
