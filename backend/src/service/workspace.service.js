import { users } from "../models/user.model.js";
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

export const addMemberService = async ({ workspaceId, userId }) => {
  if (!workspaceId || !userId) {
    throw error(400, "Workspace id and user id are required");
  }

  // check if the user exists
  const user = await users.findById(userId);
  if (!user) {
    throw error(404, "User not found");
  }

  const workspace = await workspaces.findById(workspaceId);

  // check if workspace exists

  if (!workspace) {
    throw error(404, "Workspace not found");
  }

  // check if the user is the owner
  if (workspace.owner.toString() !== userId) {
    throw error(403, "You are not authorized to add members to this workspace");
  }
  // check if the user is already a member
  if (workspace.members.includes(userId)) {
    throw error(409, "User is already a member of this workspace");
  }

  // add the user to the workspace
  workspace.members.push(userId);

  await workspace.save();

  return workspace;
};
