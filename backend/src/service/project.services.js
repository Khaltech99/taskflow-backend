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
  // concurrent fetching for good optimization and performance
  const [user, workspace, foundProject] = await Promise.all([
    users.findById(userId),
    workspaces.findById(workspaceId),
    projects.findOne({ name, workspaceId }),
  ]);

  // Check if the user exists
  if (!user) {
    throw error(404, "User not found");
  }

  // Check if workspace exists and user owns it
  if (!workspace) {
    throw error(404, "Workspace not found");
  }

  if (workspace?.owner?.toString() !== userId) {
    throw error(403, "You are not authorized to create a project");
  }

  // Check for duplicate project within THIS workspace
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

// get the project per workspace
export const getProjectService = async ({ workspaceId, userId }) => {
  const [workspace, project] = await Promise.all([
    workspaces.findById(workspaceId),
    projects.find({ workspaceId }),
  ]);
  if (!workspace) {
    throw error(404, "Workspace not found");
  }

  if (!project || project?.length === 0) {
    return [];
  }

  if (workspace?.owner?.toString() !== userId) {
    throw error(403, "You are not authorized to get projects");
  }

  return project;
};
