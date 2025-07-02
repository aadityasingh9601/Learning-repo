import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

function add(a, b) {
  return a + b;
}

//Handles json-rpc requests.
app.post("/rpc", (req, res) => {
  const { jsonrpc, method, params, id } = req.body;

  if (jsonrpc != "2.0" || !method || !Array.isArray(params)) {
    res.status(400).json({ jsonrpc: "2.0", error: { code: -32600 } });
    return;
  }

  //Execute the method.
  //We can add more functions here like subtract, multiply, etc.
  let result;
  switch (method) {
    case "add":
      result = add(params[0], params[1]);
      break;
    default:
      res.status(404).json({ jsonrpc: "2.0", error: { code: -32600 } });
  }

  //Send the response.
  res.status(200).json({ jsonrpc: "2.0", result, id });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
