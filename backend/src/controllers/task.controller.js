import { createTaskService } from "../service/task.service.js";
import { catchAsync } from "../utils/catchAsync.js";

// create task controller
export const createTask = catchAsync(async (req, res) => {
  const { userId } = req.user.sub.id;
  const { name, description, status } = req.body;

  const task = await createTaskService({});
});
