// prismaClientWithRetry.ts
import {PrismaClientWithId} from './prismaClientWithId';
import {delay, isConnectionError} from "../../utils/prisma.util";

export async function createPrismaClientWithRetry(
    maxRetries = 3,
    delayMs = 1000
): Promise<PrismaClientWithId> {
    let retries = 0;

    while (true) {
        try {
            const prisma = new PrismaClientWithId();
            await prisma.$connect();
            console.log(`Prisma Instance ID ${prisma.id}: Connected`);
            return prisma;
        } catch (error) {
            if (isConnectionError(error) && retries < maxRetries) {
                retries++;
                console.warn(
                    `Connection error occurred during Prisma client initialization. Retrying (${retries}/${maxRetries})...`
                );
                await delay(delayMs);
            } else {
                console.error(`Failed to initialize Prisma client after ${retries} retries.`);
                throw error;
            }
        }
    }
}
