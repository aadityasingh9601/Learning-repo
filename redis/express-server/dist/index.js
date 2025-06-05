"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const redis_1 = require("redis");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const client = (0, redis_1.createClient)();
const startServer = async () => {
    try {
        await client.connect();
        console.log("Connected to Redis");
        app.listen(3000, () => {
            console.log("Listening on port 3000");
        });
    }
    catch (error) {
        console.log(error);
    }
};
startServer();
app.post("/submit", async (req, res) => {
    try {
        const { problemId, userId, code, language } = req.body;
        console.log(problemId, userId, code, language);
        //Push to the redis queue.
        await client.lPush("submissions", JSON.stringify({ problemId, userId, code, language }));
        res.json({
            message: "Submission received!",
        });
    }
    catch (error) {
        res.json({
            message: `Some error occured: ${error}`,
        });
    }
});
