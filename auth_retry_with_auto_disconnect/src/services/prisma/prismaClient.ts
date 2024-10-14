import { PrismaClient } from '@prisma/client'
import {createPrismaClientWithRetry} from "./prismaClientWithRetry";

const backendPrismaClient = await createPrismaClientWithRetry()

export { backendPrismaClient }
