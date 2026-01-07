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
workspaceRouter.post("/workspace", protectedRoute, createWorkspace);

// get workspace
workspaceRouter.get("/workspace", protectedRoute, getMyWorkspaces);

// add members
workspaceRouter.post("/workspace/:workspaceId", protectedRoute, addMembers);

// delete workspace
workspaceRouter.delete(
  "/workspace/:workspaceId",
  protectedRoute,
  deleteWorkspace
);

// edit workspace

workspaceRouter.patch("/workspace/:workspaceId", protectedRoute, editWorkspace);

export default workspaceRouter;
