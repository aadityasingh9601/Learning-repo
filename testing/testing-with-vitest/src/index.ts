import express from "express";
import { prismaClient } from "./db";

export const app = express();

app.use(express.json());

app.post("/sum", async (req, res) => {
  const { a, b } = req.body;
  let answer = a + b;

  //Put data into the database.

  await prismaClient.sum.create({
    data: {
      a: a,
      b: b,
      result: answer,
    },
  });

  res.json({
    answer,
  });
});
