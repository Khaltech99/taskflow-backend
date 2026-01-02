import { loginService, registerService } from "../service/auth.service.js";
import { catchAsync } from "../utils/catchAsync.js";

export const registerController = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await registerService({ name, email, password });
  res.status(201).json({ message: "User registered successfully", user });
  next();
});

export const loginController = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await loginService({ email, password });
  res.status(200).json({ message: "User logged in successfully", user });
  next();
});
