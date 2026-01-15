import { rateLimit } from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 3,
  message: {
    success: false,
    message: "Too many attempts, try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
