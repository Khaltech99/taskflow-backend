import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      default: "todo",
      enum: ["todo", "in progress", "done"],
      required: true,
    },

    priority: {
      type: String,
      default: "low",
      enum: ["low", "medium", "high"],
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const tasks = mongoose.model("Task", TaskSchema);

export default tasks;
