import Router from "express";
import {
  createWorkspace,
  getMyWorkspaces,
} from "../controllers/workspace.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const workspaceRouter = Router();

workspaceRouter.post("/workspace", protectedRoute, createWorkspace);
workspaceRouter.get("/workspace", protectedRoute, getMyWorkspaces);

export default workspaceRouter;
