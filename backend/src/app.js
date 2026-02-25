import express from "express";
import authRouter from "./routes/auth.routes.js";
import mongoSanitize from "@exortek/express-mongo-sanitize";
import { errorHandler } from "./middleware/errorHandler.js";
import workspaceRouter from "./routes/workspace.routes.js";
import projectRouter from "./routes/project.routes.js";
import taskRouter from "./routes/task.route.js";
import uploadRouter from "./routes/file.upload.routes.js";

const app = express();

// Body detection
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());

// Routes
app.use("/auth", authRouter);
app.use("/api/v1", workspaceRouter);
app.use("/api/v1", projectRouter);
app.use("/api/v1", taskRouter);
app.use("/api/v1", uploadRouter);

app.use(errorHandler);
export default app;
