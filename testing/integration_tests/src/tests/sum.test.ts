import { describe, expect, it, beforeEach, beforeAll } from "vitest";
import { app } from "..";
import request from "supertest";
import resetDb from "./helpers/reset-db";

describe("POST /sum", () => {
  //This will run before each individual test.
  // beforeEach(async () => {
  //   console.log("clearing db");
  //   await resetDb();
  // });

  //This will run before running all the tests just once.
  beforeAll(async () => {
    console.log("clearing db");
    await resetDb();
  });

  it("should sum add 2 numbers", async () => {
    const { status, body } = await request(app).post("/sum").send({
      a: 1,
      b: 2,
    });
    expect(status).toBe(200);
    expect(body).toEqual({ answer: 3, id: expect.any(Number) });
  });

  it("should sum add 2 numbers", async () => {
    const { status, body } = await request(app).post("/sum").send({
      a: 1,
      b: 2,
    });
    expect(status).toBe(200);
    expect(body).toEqual({ answer: 3, id: expect.any(Number) });
  });
});
