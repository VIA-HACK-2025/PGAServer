import Fastify from "fastify";
import { nodeRouter } from "./routes/index.js";
import { taskRouter } from "./routes/index.js";
import { healthRouter } from "./routes/index.js";
import { connectDB } from "./db/index.js";

const fastify = Fastify();

await connectDB();

// Register routes
fastify.register(nodeRouter, { prefix: "/nodes" });
fastify.register(taskRouter, { prefix: "/tasks" });
fastify.register(healthRouter, { prefix: "/" });

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("Server listening on http://localhost:3000");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
