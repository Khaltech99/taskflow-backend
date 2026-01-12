import winston from "winston";
const { combine, timestamp, json, colorize, simple } = winston.format;

export const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), json()),
  transports: [
    // Log all levels to combined.log
    new winston.transports.File({ filename: "logs/combined.log" }),
    // Log only errors to error.log
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      level: "info",
      format: combine(colorize(), simple()),
    })
  );
}
