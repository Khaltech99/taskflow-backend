import { projects } from "../models/project.model.js";
import tasks from "../models/task.model.js";

// create task service
export const createTaskService = async ({
  userId,
  projectId,
  memberId,
  taskData,
}) => {
  if (!userId || !projectId || !taskData) {
    throw error(400, "Invalid data");
  }

  // check if the project exists
  const project = await projects.findById(projectId);
  if (!project) {
    throw error(404, "Project not found");
  }

  //   check if the the member trying to create is actually a member in the project
  if (!project.members.includes(memberId)) {
    throw error(404, "You are not a member in this project");
  }

  const task = await tasks.create(taskData);

  return task;
};
