import { getRedis } from "./redis";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 30; // per IP per window

// In-memory fallback when Redis is not configured.
const memory = new Map<string, { count: number; reset: number }>();

export type RateResult = { allowed: boolean; remaining: number; reset: number };

export async function rateLimit(ip: string): Promise<RateResult> {
  const redis = getRedis();
  const now = Date.now();

  if (redis) {
    const key = `rl:${ip}`;
    const count = await redis.incr(key);
    if (count === 1) await redis.pexpire(key, WINDOW_MS);
    const ttl = await redis.pttl(key);
    return {
      allowed: count <= MAX_REQUESTS,
      remaining: Math.max(0, MAX_REQUESTS - count),
      reset: now + (ttl > 0 ? ttl : WINDOW_MS),
    };
  }

  const entry = memory.get(ip);
  if (!entry || entry.reset < now) {
    memory.set(ip, { count: 1, reset: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1, reset: now + WINDOW_MS };
  }
  entry.count += 1;
  return {
    allowed: entry.count <= MAX_REQUESTS,
    remaining: Math.max(0, MAX_REQUESTS - entry.count),
    reset: entry.reset,
  };
}

export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "127.0.0.1";
}
