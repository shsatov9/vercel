import { PrismaClient } from "@prisma/client";

// 開発時の next dev はホットリロードのたびにモジュールを再評価するため、
// 素朴に new PrismaClient() すると接続が増え続けて DB の上限に達する。
// globalThis に保持して使い回す。本番では毎回新規で問題ない。
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
