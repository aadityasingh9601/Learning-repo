import express from "express";
import { createClient } from "redis";

const app = express();

app.use(express.json());

const client = createClient();

const startServer = async () => {
  try {
    //Currently we don't pass any urls or something to which we want to connect our redis client to, currently it just picks the default
    //localhost redis url, but if you're having a hosted redis service, you'll get the url, and while creating the client or connecting to
    //redis you can just pass the url and you will connect to that, google it or read it on docs.
    await client.connect();
    console.log("Connected to Redis");

    app.listen(3000, () => {
      console.log("Listening on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

app.post("/submit", async (req, res) => {
  try {
    const { problemId, userId, code, language } = req.body;
    console.log(problemId, userId, code, language);

    //Push to the redis queue.
    await client.lPush(
      "submissions",
      JSON.stringify({ problemId, userId, code, language })
    );

    res.json({
      message: "Submission received!",
    });
  } catch (error) {
    res.json({
      message: `Some error occured: ${error}`,
    });
  }
});
