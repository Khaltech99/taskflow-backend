import Router from "express";
import { createWorkspace } from "../controllers/workspace.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const workspaceRouter = Router();

workspaceRouter.post("/workspace", protectedRoute, createWorkspace);

export default workspaceRouter;
