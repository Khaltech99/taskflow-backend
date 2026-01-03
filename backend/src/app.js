import express from "express";
import authRouter from "./routes/auth.routes.js";
import mongoSanitize from "@exortek/express-mongo-sanitize";
import { connectDb } from "./config/database.js";
import { errorHandler } from "./middleware/errorHandler.js";
import workspaceRouter from "./routes/workspace.routes.js";

const app = express();

// Body detection
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());

connectDb();

// Routes
app.use("/auth", authRouter);
app.use("/work", workspaceRouter);

app.use(errorHandler);
export default app;
