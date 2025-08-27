import { app } from "..";
import { describe, expect, it, vi } from "vitest";
import request from "supertest";
import { prismaClient } from "../db";

//We currently don't have database url access & we're writing unit tests, so we'll just mock the prisma client here.

//The below line means using the mock prisma client for testing part.
vi.mock("../db");

//You can verify that the prismaClient is mocked by printing it on the console.
//console.log(prismaClient.$connect);

describe("Testing express app", async () => {
  it("testing post /sum", async () => {
    const res = await request(app).post("/sum").send({
      a: 1,
      b: 2,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(3);
  });
});
