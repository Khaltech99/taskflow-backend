import { users } from "../models/user.model.js";
import { workspaces } from "../models/workspace.model.js";
import { projects } from "../models/project.model.js";
import { error } from "../utils/error.js";

export const createProjectService = async ({
  name,
  description,
  workspaceId,
  userId,
  members,
}) => {
  if (!name || !description || !workspaceId || !userId || !members) {
    throw error(400, "All fields are required");
  }

  // Check if the user exists
  const user = await users.findById(userId);
  if (!user) {
    throw error(404, "User not found");
  }

  // Check if workspace exists and user owns it
  const workspace = await workspaces.findById(workspaceId);
  if (!workspace) {
    throw error(404, "Workspace not found");
  }

  if (workspace.owner.toString() !== userId) {
    throw error(403, "You are not authorized to create a project");
  }

  // Check for duplicate project within THIS workspace
  const foundProject = await projects.findOne({ name, workspaceId });
  if (foundProject) {
    throw error(409, "Project with this name already exists in this workspace");
  }

  // Create new project
  const newProject = await projects.create({
    name,
    description,
    workspaceId,
    owner: userId,
    members,
  });

  return newProject;
};
