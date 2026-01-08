import {
  createProjectService,
  getProjectService,
} from "../service/project.services.js";
import { catchAsync } from "../utils/catchAsync.js";

export const createProject = catchAsync(async (req, res) => {
  const { name, description } = req.body;

  const { workspaceId } = req.params;
  const userId = req.user.sub.id;

  const project = await createProjectService({
    name,
    description,
    workspaceId,
    members: [userId],
    userId,
  });

  res.status(201).json({
    status: "success",
    data: project,
  });
});

export const getProject = catchAsync(async (req, res) => {
  const { workspaceId } = req.params;

  const userId = req.user.sub.id;
  console.log(workspaceId);
  console.log(userId);
  const projects = await getProjectService({ workspaceId, userId });

  res.status(200).json({ success: true, data: projects });
});
