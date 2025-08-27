import { PrismaClient } from "../generated/prisma";
import { mockDeep, mockReset } from "vitest-mock-extended";

//We're mocking the whole prismaa client object and exporting it. We'll use it in our testing files.
export const prismaClient = mockDeep<PrismaClient>();
