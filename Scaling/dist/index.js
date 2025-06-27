"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const totalCPUs = os_1.default.cpus.length;
const port = 3000;
//It checks if the current process is ran by the user itself, then do something...
if (cluster_1.default.isPrimary) {
    console.log(`Total no. of CPU cores we've are ${totalCPUs}`);
    console.log(`Primary ${process.pid} is running`);
    //Fork Workers.
    for (let i = 0; i < 10; i++) {
        //Create multiple forks of the process, means run multiple processes.
        cluster_1.default.fork();
    }
    //If one worker goes down, run a new one.
    cluster_1.default.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died!`);
        console.log("Let's create another fork!");
        cluster_1.default.fork();
    });
}
else {
    //If it's not primary worker, means the proces wasn't ran by the user itself.
    //Run the app code.
    const app = (0, express_1.default)();
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
