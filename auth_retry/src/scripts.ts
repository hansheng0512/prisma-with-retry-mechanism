import {prisma} from "./services/prisma.service";

async function main() {
    try {
        const users = await prisma.user.findMany();
        console.log(users);
    } catch (error) {
        console.error('Operation failed after 3 retries:', error);
    }
}

main();
