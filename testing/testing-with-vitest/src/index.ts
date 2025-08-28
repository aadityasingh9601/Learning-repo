import express from "express";
import { prismaClient } from "./db";

export const app = express();

app.use(express.json());

app.post("/sum", async (req, res) => {
  const { a, b } = req.body;

  if (a > 1000000 || b > 1000000) {
    res.status(422).json({
      message: "Sorry we don't support big numbers!",
    });
  }

  let answer = a + b;

  //Put data into the database.

  const request = await prismaClient.sum.create({
    data: {
      a: a,
      b: b,
      result: answer,
    },
  });

  console.log(request);

  res.json({
    answer,
    id: request.id,
  });
});
