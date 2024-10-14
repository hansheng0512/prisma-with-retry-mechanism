// withPrismaClient.ts
import { createPrismaClientWithRetry } from './prismaClientWithRetry';
import {PrismaClientWithId} from "./prismaClientWithId";

export async function withPrismaClient<T>(
    fn: (prisma: PrismaClientWithId) => Promise<T>
): Promise<T> {
    const prisma = await createPrismaClientWithRetry();
    try {
        return await fn(prisma);
    } finally {
        await prisma.$disconnect();
        console.log(`Prisma Instance ID ${prisma.id}: Disconnected`);
    }
}
