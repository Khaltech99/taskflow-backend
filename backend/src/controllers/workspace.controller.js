import {
  createWorkspaceService,
  getMyWorkSpaceServices,
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
