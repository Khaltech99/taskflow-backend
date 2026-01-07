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

  // concurrent fetching  for good optimization and performance
  const [existingWorkspace, workspace] = await Promise.all([
    workspaces.findOne({ name }),
    workspaces.create({
      name,
      description,
      owner,
      members,
    }),
  ]);

  // check if workspace already exists
  if (existingWorkspace) {
    throw error(409, "Workspace already exists");
  }

  return workspace;
};

// get workspace for the current user
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

// add member to the current workspace
export const addMemberService = async ({
  workspaceId,
  newMemberId,
  currentUserId,
}) => {
  if (!workspaceId || !newMemberId || !currentUserId) {
    throw error(
      400,
      "Workspace id, new member id and current user id are required"
    );
  }

  // concurrent fetching  for good optimization and performance
  const [currentUser, newMember, workspace] = await Promise.all([
    users.findById(currentUserId),
    users.findById(newMemberId),
    workspaces.findById(workspaceId),
  ]);

  // check if the user exists
  if (!currentUser) {
    throw error(404, "User not found");
  }

  //  check if the new member exists
  if (!newMember) {
    throw error(404, "New member not found");
  }

  // check if workspace exists
  if (!workspace) {
    throw error(404, "Workspace not found");
  }

  // check if the user is the owner
  if (workspace.owner.toString() !== currentUserId) {
    throw error(403, "You are not authorized to add members to this workspace");
  }
  // check if the user is already a member
  if (workspace.members.includes(newMemberId)) {
    throw error(409, "User is already a member of this workspace");
  }

  // add the user to the workspace
  workspace.members.push(newMemberId);

  await workspace.save();

  return workspace;
};

// delete workspace
export const deleteWorkSpace = async ({ userId, workspaceId }) => {
  // 1. Check if the user exists
  const user = await users.findById(userId);
  if (!user) {
    throw error(404, "User not found");
  }

  // 2. Check if workspace exists
  const workspace = await workspaces.findById(workspaceId);
  if (!workspace) {
    throw error(404, "Workspace not found");
  }

  if (workspace.owner.toString() !== userId) {
    throw error(401, "Not authorized to delete this workspace");
  }
  // delete the workspace
  await workspaces.findByIdAndDelete(workspaceId);

  return await workspaces.find({});
};

// Edit workspace service
export const updateWorkspaceService = async ({
  userId,
  workspaceId,
  name,
  description,
}) => {
  console.log(userId);
  const user = await users.findById(userId);
  if (!user) {
    throw error(404, "User not found");
  }

  const workspace = await workspaces.findById(workspaceId);
  if (!workspace) {
    throw error(404, "Workspace not found");
  }

  const updatedInfo = await workspaces.findOneAndUpdate(
    { owner: userId, _id: workspaceId },
    { $set: { name: name, description: description } },
    { new: true }
  );

  return updatedInfo;
};
