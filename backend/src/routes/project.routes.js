import Router from "express";
import {
  createProject,
  deleteProject,
  getProject,
} from "../controllers/project.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const projectRouter = Router();

// create route
projectRouter.post("/projects/:workspaceId", protectedRoute, createProject);

// get route
projectRouter.get("/projects/:workspaceId", protectedRoute, getProject);

// delete route
projectRouter.delete(
  "/projects/:workspaceId/:projectId",
  protectedRoute,
  deleteProject
);

export default projectRouter;
