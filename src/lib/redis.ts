import type Redis from "ioredis";

// Optional Redis. If REDIS_URL is not set the app runs fully without it
// (rate limiting + queue fall back to in-memory). This keeps the project
// runnable out of the box while remaining scalable when Redis is provided.
let client: Redis | null | undefined;

export function getRedis(): Redis | null {
  if (client !== undefined) return client;
  const url = process.env.REDIS_URL;
  if (!url) {
    client = null;
    return client;
  }
  // Lazy require so ioredis is never loaded unless configured.
  const IORedis = require("ioredis") as typeof import("ioredis").default;
  client = new IORedis(url, { maxRetriesPerRequest: 2, lazyConnect: false });
  client.on("error", (e: Error) => console.error("[redis]", e.message));
  return client;
}
