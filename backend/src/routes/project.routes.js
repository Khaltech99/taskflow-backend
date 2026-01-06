import Router from "express";
import { createProject } from "../controllers/project.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const projectRouter = Router();

projectRouter.post("/projects/:workspaceId", protectedRoute, createProject);

export default projectRouter;
