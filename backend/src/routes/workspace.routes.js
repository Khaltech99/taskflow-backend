import Router from "express";
import {
  addMembers,
  createWorkspace,
  deleteWorkspace,
  getMyWorkspaces,
} from "../controllers/workspace.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const workspaceRouter = Router();

workspaceRouter.post("/workspace", protectedRoute, createWorkspace);
workspaceRouter.get("/workspace", protectedRoute, getMyWorkspaces);
workspaceRouter.post("/workspace/:workspaceId", protectedRoute, addMembers);
workspaceRouter.delete(
  "/workspace/:workspaceId",
  protectedRoute,
  deleteWorkspace
);

export default workspaceRouter;
