import express from "express";

export const app = express();

app.use(express.json());

app.post("/sum", (req, res) => {
  const { a, b } = req.body;
  let ans = a + b;
  console.log(ans);
  res.json({
    ans,
  });
});
