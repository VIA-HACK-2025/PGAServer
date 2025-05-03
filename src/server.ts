import Fastify from "fastify";
import { nodeRouter } from "./routes/index.js";
import { taskRouter } from "./routes/index.js";
import { healthRouter } from "./routes/index.js";
import { connectDB } from "./db/index.js";
import cors from "@fastify/cors";

const fastify = Fastify();

await connectDB();
await fastify.register(cors, {
  origin: [
    "http://localhost:5173",
    "http://172.20.10.4:5174",
    "http://localhost:5174",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
});

// Register routes
fastify.register(nodeRouter, { prefix: "/nodes" });
fastify.register(taskRouter, { prefix: "/tasks" });
fastify.register(healthRouter, { prefix: "/" });

// Start the server
const start = async () => {
  try {
    await fastify.listen({ host: "localhost", port: 3000 });
    console.log("Server listening on http://localhost:3000");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
