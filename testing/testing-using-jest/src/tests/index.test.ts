import { describe, expect, it } from "@jest/globals";
import { sum } from "..";

//You can also interchangeably use test in place of it, both of them are the same, just different names.

describe("tests for add", () => {
  it("should return sum correctly", () => {
    const finalAns = sum(1, 2);
    expect(finalAns).toBe(3);
  });

  it("should return sum correctly", () => {
    const finalAns = sum(1, 2);
    expect(finalAns).toBe(3);
  });
});
