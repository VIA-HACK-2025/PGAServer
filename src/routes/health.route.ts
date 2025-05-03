import { FastifyInstance } from "fastify";

export async function healthRouter(fastify: FastifyInstance) {
  // Node Routes

  fastify.get("/", async (request, reply) => {
    reply.send("Hi! I'm healthy!");
  });
}
