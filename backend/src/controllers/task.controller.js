import {
  createTaskService,
  getTasksService,
  updateTaskService,
} from "../service/task.service.js";
import { catchAsync } from "../utils/catchAsync.js";

// create task controller
export const createTask = catchAsync(async (req, res) => {
  const userId = req.user.sub.id;
  const { name, description, owner, projectId, memberId } = req.body;
  const { status, priority } = req.params;

  const taskData = {
    name,
    description,
    owner,
    status,
    priority,
  };
  const task = await createTaskService({
    userId,
    projectId,
    memberId,
    taskData,
  });

  res.status(201).json({
    status: "success",
    data: task,
  });
});

// get task controller
export const getTasks = catchAsync(async (req, res) => {
  const userId = req.user.sub.id;
  const { projectId } = req.body;
  const { page, limit } = req.query;

  const tasks = await getTasksService({
    userId,
    projectId,
    page,
    limit,
  });

  res.status(200).json({
    status: "success",
    data: tasks,
  });
});

// update task controller
export const editTask = catchAsync(async (req, res) => {
  const { name, description } = req.body;
  const { taskId } = req.params;
  const userId = req.user.sub.id;

  const updatedTask = await updateTaskService({
    userId,
    taskId,
    name,
    description,
  });
  res.status(200).json({
    status: "success",
    data: updatedTask,
  });
});
