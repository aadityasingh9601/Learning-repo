import { app } from "..";
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

describe("Testing express app", () => {
  it("testing post /sum", async () => {
    const res = await request(app).post("/sum").send({
      a: 1,
      b: 2,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.ans).toBe(3);
  });
});
