import {
  addMemberService,
  createWorkspaceService,
  deleteWorkSpace,
  getMyWorkSpaceServices,
  updateWorkspaceService,
} from "../service/workspace.service.js";
import { catchAsync } from "../utils/catchAsync.js";

// create workspace
export const createWorkspace = catchAsync(async (req, res, next) => {
  const { name, description } = req.body;

  const owner = req.user.sub.id;
  const members = [owner];

  if (!req.user) {
    return next(error(401, "Unauthorized"));
  }

  const workspace = await createWorkspaceService({
    name,
    description,
    owner: owner,
    members: members,
  });
  res.status(201).json({
    status: "success",
    workspace,
  });
});

// GET /workspaces or /my-workspaces
export const getMyWorkspaces = catchAsync(async (req, res) => {
  const userId = req.user.sub.id;

  const myWorkspaces = await getMyWorkSpaceServices({ userId });

  res.status(200).json({
    status: "success",
    data: { workspaces: myWorkspaces },
  });
});

// Add members to workspace
export const addMembers = catchAsync(async (req, res, next) => {
  const { newMemberId } = req.body;
  const { workspaceId } = req.params;
  const currentUserId = req.user.sub.id;

  const addMember = await addMemberService({
    workspaceId,
    newMemberId,
    currentUserId,
  });

  res.status(200).json({
    status: "success",
    data: { addMember },
  });
});

// delete workspace
export const deleteWorkspace = catchAsync(async (req, res) => {
  const userId = req.user.sub.id;
  const { workspaceId } = req.params;

  const remainingWorkspacesData = await deleteWorkSpace({
    userId,
    workspaceId,
  });
  res.status(200).json({ data: remainingWorkspacesData });
});

//edit workspace

export const editWorkspace = catchAsync(async (req, res, next) => {
  const { workspaceId } = req.params;
  const { name, description } = req.body;
  const userId = req.user.sub.id;

  const updatedWorkspace = await updateWorkspaceService({
    userId,
    workspaceId,
    name,
    description,
  });

  res.status(200).json({
    status: "success",
    data: { updatedWorkspace },
  });
});
