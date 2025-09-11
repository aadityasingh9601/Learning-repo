import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

export default async () => {
  //We're using a transaction here as we want either all of the steps to be done, or nothing should be done at all.
  await prisma.$transaction([prisma.request.deleteMany()]);
};
