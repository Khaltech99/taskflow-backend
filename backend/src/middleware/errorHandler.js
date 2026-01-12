import { logger } from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  logger.error({
    message: message,
    statusCode: statusCode,
    path: req.path,
    method: req.method,
    stack: process.env.NODE_ENV !== "production" ? err.stack : undefined,
  });
  res.status(statusCode).json({ success: false, message: message });
};
