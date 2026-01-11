import Router from "express";
import {
  createTask,
  deleteTask,
  editTask,
  getTasks,
} from "../controllers/task.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const taskRouter = Router();

// create task
taskRouter.post("/tasks", protectedRoute, createTask);

// get Task
taskRouter.get("/tasks", protectedRoute, getTasks);

// update Task
taskRouter.patch("/tasks/:taskId", protectedRoute, editTask);

// delete Task
taskRouter.delete("/tasks/:taskId", protectedRoute, deleteTask);

export default taskRouter;
