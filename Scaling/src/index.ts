import express from "express";
import cluster from "cluster";
import os from "os";

const totalCPUs = os.cpus.length;

const port = 3000;

//It checks if the current process is ran by the user itself, then do something...
if (cluster.isPrimary) {
  console.log(`Total no. of CPU cores we've are ${totalCPUs}`);
  console.log(`Primary ${process.pid} is running`);

  //Fork Workers.
  for (let i = 0; i < 10; i++) {
    //Create multiple forks of the process, means run multiple processes.
    cluster.fork();
  }
  //If one worker goes down, run a new one.
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died!`);
    console.log("Let's create another fork!");
    //Create a child process by creating a fork of the parent.
    cluster.fork();
  });
} else {
  //If it's not primary worker, means the proces wasn't ran by the user itself.
  //Run the app code.
  const app = express();
  console.log(`Process ${process.pid} started!`);

  app.get("/", (req, res) => {
    res.send("Hello world!");
  });

  app.get("/api/:n", (req, res) => {
    const n = parseInt(req.params.n);

    let count = 0;

    //Write logic to calculate the count here.
    count = (n * (n + 1)) / 2;

    res.send(`Final count is ${count} ${process.pid}`);
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}
