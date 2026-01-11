import { projects } from "../models/project.model.js";
import tasks from "../models/task.model.js";
import { error } from "../utils/error.js";

// create task service
export const createTaskService = async ({
  userId,
  projectId,
  memberId,
  taskData,
}) => {
  if (!userId || !projectId || !taskData || !memberId) {
    throw error(400, "Invalid data");
  }

  // check if the project exists
  const project = await projects.findById(projectId);

  if (!project) {
    throw error(404, "Project not found");
  }

  // check if it is the project owner
  if (project?.owner.toString() !== userId) {
    throw error(401, "User not authorized for this action");
  }

  //   check if the the member trying to create is actually a member in the project
  if (!project?.members?.includes(memberId)) {
    throw error(404, "You are not a member in this project");
  }

  const task = await tasks.create({
    ...taskData,
    owner: userId,
    projectId,
    memberId,
    assignedTo: memberId,
  });
  return task;
};

// get task service
export const getTasksService = async ({
  userId,
  projectId,
  page = 1,
  limit = 10,
}) => {
  if (!userId || !projectId) throw error(400, "Missing IDs");

  // skip calculation
  const skip = (page - 1) * limit;

  // 1. Run queries in parallel for better performance
  const [availableTasks, total] = await Promise.all([
    tasks.find({ projectId: projectId }).limit(limit).skip(skip),
    tasks.countDocuments({ projectId: projectId }),
  ]);

  return {
    data: availableTasks,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
};

// update task service

export const updateTaskService = async ({
  userId,
  taskId,
  name,
  description,
}) => {
  if (!taskId || !userId) {
    throw error(404, "Invalid input");
  }

  const task = await tasks.findOne({ owner: userId, _id: taskId });

  if (!task) {
    throw error(404, "Task not found");
  }

  if (task?.owner.toString() !== userId) {
    throw error(401, "Not authorized for this action");
  }

  const updatedTask = await tasks.findOneAndUpdate(
    { owner: userId, _id: taskId },
    {
      $set: {
        name,
        description,
      },
    },
    { new: true }
  );

  return updatedTask;
};
