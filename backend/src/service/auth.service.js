import { users } from "../models/user.model.js";
import { error } from "../utils/error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const registerService = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw error(400, "All fields are required");
  }

  const existingUser = await users.findOne({ email });

  // check if user exists
  if (existingUser) {
    throw error(409, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  // create new user object
  const newUser = users.create({
    name,
    email,
    password: hashedPassword,
  });

  return newUser;
};

export const loginService = async ({ email, password }) => {
  if (!email || !password) {
    throw error(400, "All fields are required");
  }
  const user = await users.findOne({ email }).select("+password");
  if (!user) {
    throw error(404, "User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw error(401, "Invalid credentials");
  }

  // check if there is jwt secret
  if (!JWT_SECRET) {
    throw error(500, "JWT_SECRET is not defined");
  }
  const token = jwt.sign(
    { sub: { id: user._id, email: user.email } },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  return { user, token };
};
