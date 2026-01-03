import { catchAsync } from "../utils/catchAsync.js";
import { error } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const protectedRoute = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(error(401, "Unauthorized"));
  }
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return next(error(401, "Unauthorized"));
  }
  const token = parts[1];

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decodedToken;
  next();
});
