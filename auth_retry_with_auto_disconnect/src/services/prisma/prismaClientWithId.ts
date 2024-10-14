// prismaClientWithId.ts
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient, Prisma } from '@prisma/client';
import {delay, isConnectionError} from "../../utils/prisma.util";

export class PrismaClientWithId extends PrismaClient {
    public id: string;

    constructor() {
        super();
        this.id = uuidv4();

        // Attach middleware to handle retries during query execution
        this.$use(async (params, next) => {
            const maxRetries = 3;
            let retries = 0;
            const prismaId = this.id;

            while (true) {
                try {
                    return await next(params);
                } catch (error) {
                    if (isConnectionError(error) && retries < maxRetries) {
                        retries++;
                        console.warn(
                            `Prisma Instance ID ${prismaId}: Connection error during query execution. Retrying (${retries}/${maxRetries})...`
                        );
                        await delay(1000);
                        await this.$connect();
                    } else {
                        console.error(
                            `Prisma Instance ID ${prismaId}: Query failed after ${retries} retries.`
                        );
                        throw error;
                    }
                }
            }
        });
    }
}
