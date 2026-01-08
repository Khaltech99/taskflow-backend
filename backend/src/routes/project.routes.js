import Router from "express";
import {
  createProject,
  getProject,
} from "../controllers/project.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const projectRouter = Router();

projectRouter.post("/projects/:workspaceId", protectedRoute, createProject);
projectRouter.get("/projects/:workspaceId", protectedRoute, getProject);

export default projectRouter;
