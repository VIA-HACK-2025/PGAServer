import mongoose, { Schema } from "mongoose";

const TaskSchema: Schema = new Schema({
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Node",
    required: true,
  },
  value: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["completed", "not-completed"],
    default: "not-completed",
  },
});

const TaskModel = mongoose.model("Task", TaskSchema);

export { TaskModel };
