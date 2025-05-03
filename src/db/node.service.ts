import { Types } from "mongoose";
import { NodeModel } from "../model/schemas/index.js";

export const createNode = async (
  parentId: Types.ObjectId | undefined = undefined,
  info: { title?: string; icon?: string } | undefined = undefined
) => {
  return await NodeModel.create({ parentId, info });
};

export const getNode = async (id: Types.ObjectId) => {
  return await NodeModel.findOne({ _id: id });
};

export const getAllNodes = async () => {
  console.log("Fetching all nodes from the database...");
  return await NodeModel.find();
};

export const deleteNodeById = async (id: Types.ObjectId) => {
  return await NodeModel.findByIdAndDelete(id);
};
