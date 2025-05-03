import { Types } from "mongoose";
import { TaskModel, NodeModel } from "../model/schemas/index.js";

export const createTask = async (parentId: Types.ObjectId) => {
  const parentNode = await NodeModel.findById(parentId);
  if (!parentNode) throw new Error("Parent node not found");
  const task = await TaskModel.create({ parentId });

  if (!parentNode.data) {
    parentNode.data = [];
  }
  (parentNode.data as Types.ObjectId[]).push(task._id as Types.ObjectId);
  await parentNode.save();

  return task;
};

export const getTask = async (id: Types.ObjectId) => {
  return await TaskModel.findOne({ _id: id });
};

export const getAllTasks = async (parentId: Types.ObjectId) => {
  try {
    const node = await NodeModel.findOne({ _id: parentId }).populate("data");
    if (!node) {
      throw new Error("Node not found");
    }
    return node.data; // This will be the array of populated Task documents
  } catch (err) {
    console.error("Error fetching tasks:", err);
    throw err;
  }
};

export const deleteTaskById = async (id: Types.ObjectId) => {
  return await TaskModel.findByIdAndDelete(id);
};
