import Router from "express";
import { createTask } from "../controllers/task.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const taskRouter = Router();

// create task
taskRouter.post("/tasks", protectedRoute, createTask);
export default taskRouter;
