import { app } from "..";
import { describe, expect, it, vi } from "vitest";
import request from "supertest";

//We currently don't have database url access & we're writing unit tests, so we'll just mock the prisma client here.

vi.mock("../db", () => {
  return {
    prismaClient: { sum: { create: vi.fn() } },
  };
});

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
