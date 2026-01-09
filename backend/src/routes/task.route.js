import Router from "express";
import { createTask } from "../controllers/task.controller.js";

const taskRouter = Router();

// create task
taskRouter.post("/tasks", createTask);
export default taskRouter;
