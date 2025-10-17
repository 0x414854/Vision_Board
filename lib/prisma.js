import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

// Si un client Prisma existe déjà (en dev, avec hot reload), on le réutilise
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
