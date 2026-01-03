import { catchAsync } from "../utils/catchAsync.js";

// create workspace
export const createWorkspace = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(error(401, "Unauthorized"));
  }

  res.status(201).json({
    status: "success",
  });
});
