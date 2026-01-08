import Router from "express";
import {
  createProject,
  deleteProject,
  getProject,
} from "../controllers/project.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const projectRouter = Router();

projectRouter.post("/projects/:workspaceId", protectedRoute, createProject);
projectRouter.get("/projects/:workspaceId", protectedRoute, getProject);
projectRouter.delete(
  "/projects/:workspaceId/:projectId",
  protectedRoute,
  deleteProject
);

export default projectRouter;
