import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

// Middleware to automatically retry failed queries up to 3 times
prisma.$use(async (params, next) => {
    const maxRetries = 5;
    let attempt = 0;

    while (attempt < maxRetries) {
        try {
            // Attempt to execute the query
            return await next(params); // Success, return the result
        } catch (error) {
            attempt++;

            console.warn(
                `Connection error occurred during Prisma client initialization. Retrying (${attempt}/${maxRetries})...`
            );

            if (attempt >= maxRetries) {
                console.warn(
                    `Max retries reached`
                );
                // Max retries reached, rethrow the error
                throw error;
            }

            // Optionally, implement a delay before retrying
            await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay
        }
    }
});

export { prisma };
