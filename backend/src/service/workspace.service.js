import { workspaces } from "../models/workspace.model.js";
import { error } from "../utils/error.js";

// Create workspace
export const createWorkspaceService = async ({
  name,
  description,
  owner,
  members,
}) => {
  // check if all fields are provided
  if (!name || !description || !owner || !members) {
    throw error(400, "All fields are required");
  }

  // check if workspace already exists
  const existingWorkspace = await workspaces.findOne({ name });

  if (existingWorkspace) {
    throw error(409, "Workspace already exists");
  }

  const workspace = await workspaces.create({
    name,
    description,
    owner,
    members,
  });
  return workspace;
};

export const getMyWorkSpaceServices = async ({ userId }) => {
  if (!userId) {
    throw error(400, "User id is required");
  }

  const userWorkspaces = await workspaces
    .find({
      $or: [{ owner: userId }, { members: userId }],
    })
    .sort({ createdAt: -1 });

  return userWorkspaces;
};
