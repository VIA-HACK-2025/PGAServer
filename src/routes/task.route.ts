import { FastifyInstance } from "fastify";
import { Types } from "mongoose";
import {
  createTask,
  getTask,
  getAllTasks,
  deleteTaskById,
} from "../db/index.js";

export async function taskRouter(fastify: FastifyInstance) {
  fastify.post("/", async (request, reply) => {
    const { parentId } = request.body as { parentId: Types.ObjectId };
    try {
      const task = await createTask(parentId);
      reply.status(201).send(task);
    } catch (error) {
      reply.status(500).send({ error: "Failed to create task" });
      console.error("Error posting task:", error);
    }
  });

  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    try {
      const task = await getTask(new Types.ObjectId(id));
      if (task) {
        reply.send(task);
      } else {
        reply.status(404).send({ error: "Task not found" });
      }
    } catch (error) {
      reply.status(500).send({ error: "Failed to fetch task" });
      console.error("Error getting task:", error);
    }
  });

  fastify.get("/", async (request, reply) => {
    const { parentId } = request.query as { parentId: string };
    try {
      const tasks = await getAllTasks(new Types.ObjectId(parentId));
      reply.send(tasks);
    } catch (error) {
      reply.status(500).send({ error: "Failed to fetch tasks" });
      console.error("Error getting tasks:", error);
    }
  });

  fastify.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    try {
      const result = await deleteTaskById(new Types.ObjectId(id));
      if (result) {
        reply.status(200).send({ message: "Task deleted successfully" });
      } else {
        reply.status(404).send({ error: "Task not found" });
      }
    } catch (error) {
      reply.status(500).send({ error: "Failed to delete task" });
      console.error("Error deleting task:", error);
    }
  });
}
