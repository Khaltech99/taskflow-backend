import { createTaskService } from "../service/task.service.js";
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
