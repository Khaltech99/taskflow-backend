import { catchAsync } from "../utils/catchAsync.js";

export const registerController = catchAsync(async (req, res, next) => {
  console.log("hey");
  res.send("away");
  //const { name, email, password } = req.body;
});

export const loginController = async (req, res, next) => {
  res.send("login");
};
