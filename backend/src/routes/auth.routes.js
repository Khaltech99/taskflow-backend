import Router from "express";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller.js";
import validate from "../middleware/validate.js";
import { LoginSchema, RegisterSchema } from "../schema/validate.schema.js";
import { authLimiter } from "../middleware/rateLimitMiddleWare.js";

const authRouter = Router();

authRouter.post(
  "/register",
  authLimiter,
  validate(RegisterSchema),
  registerController
);
authRouter.post("/login", authLimiter, validate(LoginSchema), loginController);

export default authRouter;
