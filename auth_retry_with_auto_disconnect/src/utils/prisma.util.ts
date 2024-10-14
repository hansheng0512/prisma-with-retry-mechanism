// utils.ts (or wherever you define utility functions)
import { Prisma } from '@prisma/client';

export function isConnectionError(error: any): boolean {
    console.error('Prisma error encountered:', error);

    if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        ['P1000', 'P1001', 'P1002', 'P1003'].includes(error.code)
    ) {
        return true;
    }

    if (error instanceof Prisma.PrismaClientInitializationError) {
        return true;
    }

    if (error instanceof Prisma.PrismaClientRustPanicError) {
        return true;
    }

    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        return true;
    }

    return false;
}

// Don't forget to export `delay` function as well
export function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
