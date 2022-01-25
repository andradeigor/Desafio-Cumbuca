import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async (): Promise<void> => {
  const newUser = await prisma.user.findMany();
  console.log(newUser);
};

main();
