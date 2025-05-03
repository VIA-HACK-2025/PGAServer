import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { Types } from "mongoose";
import {
  createNode,
  getNode,
  getAllNodes,
  deleteNodeById,
} from "../db/index.js";

export async function nodeRouter(fastify: FastifyInstance) {
  fastify.post(
    "/",
    async (
      request: FastifyRequest<{
        Body: {
          parentId?: Types.ObjectId;
          info?: { title?: string; icon?: string };
        };
      }>,
      reply: FastifyReply
    ) => {
      const parentId = request.body?.parentId;
      const info = request.body?.info || { title: "", icon: "" };
      try {
        const node = await createNode(parentId, info);
        reply.status(201).send(node);
      } catch (error) {
        reply.status(500).send({ error: "Failed to create node" });
        console.error("Error creating node:", error);
      }
    }
  );

  fastify.get("/", async (request, reply) => {
    try {
      const nodes = await getAllNodes();
      reply.send(nodes);
    } catch (error) {
      reply.status(500).send({ error: "Failed to fetch nodes" });
      console.error("Error fetching nodes:", error);
    }
  });

  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    try {
      const node = await getNode(new Types.ObjectId(id));
      if (node) {
        reply.send(node);
      } else {
        reply.status(404).send({ error: "Node not found" });
      }
    } catch (error) {
      reply.status(500).send({ error: "Failed to fetch node" });
      console.error("Error fetching node:", error);
    }
  });

  fastify.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    try {
      const result = await deleteNodeById(new Types.ObjectId(id));
      if (result) {
        reply.status(200).send({ message: "Node deleted successfully" });
      } else {
        reply.status(404).send({ error: "Node not found" });
      }
    } catch (error) {
      reply.status(500).send({ error: "Failed to delete node" });
      console.error("Error deleting node:", error);
    }
  });
}
