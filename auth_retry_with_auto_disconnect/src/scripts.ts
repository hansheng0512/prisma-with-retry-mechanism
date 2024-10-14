import {withPrismaClient} from "./services/prisma/withPrismaClient";

async function main() {
    // // Example: Create a new user
    // const newUser = await prisma.user.create({
    //     data: {
    //         email: 'alice@prisma.io',
    //         name: 'Alice',
    //     },
    // });
    //
    // console.log('Created new user:', newUser);

    await withPrismaClient(async (prisma) => {
        const allUsers = await prisma.user.findMany();
        console.log('All users 1:', allUsers);
    });

    await withPrismaClient(async (prisma) => {
        const allUsers = await prisma.user.findMany();
        console.log('All users 2:', allUsers);
    });

    await withPrismaClient(async (prisma) => {
        const allUsers = await prisma.user.findMany();
        console.log('All users 3:', allUsers);
    });
}

main()
    .catch((e) => {
        console.error(e);
    })
