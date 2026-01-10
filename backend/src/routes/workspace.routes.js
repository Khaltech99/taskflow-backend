import Router from "express";
import {
  addMembers,
  createWorkspace,
  deleteWorkspace,
  editWorkspace,
  getMyWorkspaces,
} from "../controllers/workspace.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const workspaceRouter = Router();

// create workspace
workspaceRouter.post("/workspaces", protectedRoute, createWorkspace);

// get workspace
workspaceRouter.get("/workspaces", protectedRoute, getMyWorkspaces);

// add members
workspaceRouter.post("/workspaces/:workspaceId", protectedRoute, addMembers);

// delete workspace
workspaceRouter.delete(
  "/workspaces/:workspaceId",
  protectedRoute,
  deleteWorkspace
);

// edit workspace
workspaceRouter.patch(
  "/workspaces/:workspaceId",
  protectedRoute,
  editWorkspace
);

export default workspaceRouter;
