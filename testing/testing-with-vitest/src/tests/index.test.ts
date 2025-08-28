import { app } from "..";
import { describe, expect, it, vi } from "vitest";
import request from "supertest";
import { prismaClient } from "../__mocks__/db";

//We currently don't have database url access & we're writing unit tests, so we'll just mock the prisma client here.

//The below line means using the mock prisma client for testing part.
vi.mock("../db");

//You can verify that the prismaClient is mocked by printing it on the console.
//console.log(prismaClient.$connect);

describe("testing post /sum", async () => {
  it("Should fail if returned values are incorrect", async () => {
    //Let's mock the returned value here, as sometimes our code depends on the returned value, but currently we're not
    //doing any real db calls, so we need to mock the returned values.
    prismaClient.sum.create.mockResolvedValue({
      a: 1,
      b: 2,
      result: 3,
      id: 25,
    });

    //Add a spy on the function to ensure it receives & sends only the correct inputs to the database.
    vi.spyOn(prismaClient.sum, "create");

    const res = await request(app).post("/sum").send({
      a: 1,
      b: 2,
    });

    //Use the different methods available in our testing library to assert what inputs do we want.
    expect(prismaClient.sum.create).toHaveBeenCalledWith({
      data: {
        a: 1,
        b: 2,
        result: 3,
      },
    });
    //Now if the real function, even by mistake the value gets changed, there's no problem, test with handle that by
    //throwing error, now it's been verified that the function is called only with the inputs that are asserted here, if
    //they change, error will be thrown.

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(25);
    expect(res.body.answer).toBe(3);
  });

  //To test the edge case.
  it("Should fail when a number is too big", async () => {
    const res = await request(app).post("/sum").send({
      a: 1000000000,
      b: 10,
    });

    expect(res.statusCode).toBe(422);
    expect(res.body.message).toBe("Sorry we don't support big numbers!");
  });
});
