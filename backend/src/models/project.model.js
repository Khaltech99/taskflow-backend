import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    workspaceId: String,
    owner: String,
    members: [String],
  },
  { timestamps: true }
);

export const projects = mongoose.model("Project", projectSchema);
