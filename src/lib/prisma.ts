/* eslint-disable @typescript-eslint/no-explicit-any */
// Optional Prisma client. Used for usage analytics / job records when a
// DATABASE_URL is configured. The app does not require it to function, and it
// is intentionally loosely typed so the project builds even before you run
// `npx prisma generate`.
type AnyPrisma = {
  usage: { create: (args: any) => Promise<unknown> };
} & Record<string, any>;

const globalForPrisma = globalThis as unknown as { prisma?: AnyPrisma | null };

export function getPrisma(): AnyPrisma | null {
  if (globalForPrisma.prisma !== undefined) return globalForPrisma.prisma;
  if (!process.env.DATABASE_URL) {
    globalForPrisma.prisma = null;
    return null;
  }
  try {
    const { PrismaClient } = require("@prisma/client");
    globalForPrisma.prisma = new PrismaClient();
  } catch {
    // Client not generated yet — run `npx prisma generate`.
    globalForPrisma.prisma = null;
  }
  return globalForPrisma.prisma ?? null;
}

/** Fire-and-forget usage log. No-op when DB is not configured. */
export async function logUsage(tool: string, bytesIn: number, bytesOut: number) {
  const db = getPrisma();
  if (!db) return;
  try {
    await db.usage.create({ data: { tool, bytesIn, bytesOut } });
  } catch {
    /* analytics must never break the request */
  }
}
