import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const newTodo = await prisma.todo.create({
        data: {
          description: 'Fullstack tutorial for GraphQL',
          checked: true,
        },
      })

    const allTodo = await prisma.todo.findMany();
    console.log(allTodo);
}


main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });